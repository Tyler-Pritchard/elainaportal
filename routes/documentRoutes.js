const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Mailer = require('../services/Mailer');
const documentTemplate = require('../services/documentTemplates/Buy_Sell_Agreement');

const Document = mongoose.model('documents');

module.exports = app => {
  app.get('/api/documents', requireLogin, async (req, res) => {
    const documents = await Document.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(documents);
  });

  app.get('/api/documents/:documentId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/documents/webhooks', (req, res) => {
    const p = new Path('/api/documents/:documentId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, documentId: match.documentId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'documentId')
      .each(({ documentId, email, choice }) => {
        Document.updateOne(
          {
            _id: documentId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post('/api/documents', requireLogin, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const document = new Document({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Great place to send an email!
    const mailer = new Mailer(document, documentTemplate(document));

    try {
      await mailer.send();
      await document.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};