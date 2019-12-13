require("dotenv").config();
var config = require("../config");
var Chat = require('../models/chat');
var path = require('path');
var User = require('../models/user');
var DocApprove = require('../models/docapprove');
const _ = require("lodash");

const dialogflow = require('dialogflow');
const uuid = require('uuid');

const structjson = require('./structJson.js');

var emailSender = require('./emailSender.js');

var htmlDocxJs = require("html-docx-js");
const AWS = require('aws-sdk');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */

class DeepDialogFlow {
  constructor() {
    let privateKey = (process.env.NODE_ENV == "production") ? process.env.DIALOGFLOW_PRIVATE_KEY : process.env.DIALOGFLOW_PRIVATE_KEY
    privateKey = _.replace(privateKey, new RegExp("\\\\n", "\g"), "\n")
    let clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL
    let config = {
      credentials: {
        private_key: privateKey,
        client_email: clientEmail
      }
    }
    // A unique identifier for the given session
    this.sessionClient = new dialogflow.SessionsClient(config);
    // const sessionId = uuid.v4();
    // this.sessionPath = this.sessionClient.sessionPath('abbi-cvflsy', sessionId);
  }

  getSessionPath() {
    const sessionId = uuid.v4();
    var sessionPath = this.sessionClient.sessionPath('abbi-cvflsy', sessionId);
    return sessionPath;
  }

  async chat(text, sessionPath) {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text.replace('\n', ''),
          // The language used by the client (en-US)
          languageCode: 'en-US',
        }
      }
    };
    const responses = await this.sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    
    return result.fulfillmentText;
  }
}

myDialogflow = new DeepDialogFlow();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function logMapElements(value, key, map) {
  console.log(`m[${key}] = ${value}`);
}

// Adds a new message to the chat log
// checked if document was completed and needs to be approved
// sends to approvers
exports.addChat = async function (req, res) {
  let content = req.body.content;
  let sessionPath = null;
  if (req.session['sessionPath']) {
    sessionPath = req.session.sessionPath;
  }
  else {
    req.session['sessionPath'] = myDialogflow.getSessionPath();
    sessionPath = req.session['sessionPath'];
  }
  let resultText = await myDialogflow.chat(content, sessionPath);

  // this is the que to wrap up document
  if (resultText.includes('we’re done')) {
    const fs = require('fs');

    // Select Approver
    var approver;
    var admins = await User.find({role: "admin"});
    if (!admins) {
      // handle errors
      console.log("there is no admin");
    } else {
      approver = admins[getRandomInt(0, admins.length - 1)];
    }

    var currentUser = await User.findOne({email: req.user.email});

    //var formArray = [ "Background Check Policy", "Family and Medical Leave Policy" ];
    //var formDocmArray = [ "Background_Check_Policy", "Family_and_Medical_Leave_Policy" ];

    let intents = new Map();
    intents.set("Family Medical Leave Policy", Family_Medical_Leave_Policy)
    intents.set("Background Check Policy", Background_Check_Policy)
    intents.set("operating agreement", opr_agreement)
    intents.set("Employee Non-Compete Agreement", Employee_NonCompete_Agreement)
    intents.set("Dress Code Policy", Dress_Code_Policy)
    intents.set("Independent Contractor Agreement", Independent_Contractor_Agreement)
    intents.set("Buy-Sell Agreement", Buy_Sell_Agreement)
    intents.set("Equal Opportunity Employment Policy", Equal_Opportunity_Employment_Policy)
    intents.set("Operating Agreement Multi-Member", Operating_Agreement_Multi_Member)
    intents.set("Mutual Non-Disclosure Agreement", Mutual_Non_Disclosure_Agreement)
    intents.set("Corporate Bylaws", Corporate_Bylaws)

    intents.forEach(logMapElements);

    var info = currentUser['Background_Check_Policy'];

    console.log("typeof info:");
    console.log(typeof info);
    console.log("info.length:");
    //console.log(info.keys().length);

    //await emailSender.sendEmail('spoon.jeremy@gmail.com', approver['email'], 'Please approve the documents from Deeplaw', 'test', '<strong>There are documents from ' + req.user.username + '</strong>');
    console.log('<strong>There are documents from ' + req + '</strong>');
    var emailResult = await emailSender.sendEmail('chukhman@uic.edu', 'morrisc@gmail.com', 'Please approve the documents from Deeplaw', 'test', '<strong>There are documents from : + req.user.username + </strong>');
    let data = fs.readFileSync(__dirname + '/../template/test.htm', 'utf8');
    console.log("__dirname:");
    console.log(__dirname);
    console.log('data.length');
    console.log(data.length);

    String.prototype.replaceAll = function (search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };
    console.log(info);
    console.log("--------")
    AWS.config.getCredentials(function(err) {
      if (err) console.log(err.stack); // credentials not loaded
      else {
        console.log('ApprovedDocs');

        console.log("Access Key:", AWS.config.credentials.accessKeyId);
        console.log("Secret Access Key:", AWS.config.credentials.secretAccessKey);
        //console.log("s3BuscketEndpoint:", AWS.config.s3BucketEndpoint);
      }
    });

    // Replace Template Fields with values in database
    var keys = Object.keys(info);
    for (k in keys.slice(1,keys.length)){
      console.log(keys[k]+":"+info[keys[k]]);
      data = data.replaceAll('d.'+keys[k], info[keys[k]]);
      //console.log(data);
    }

    console.log('data.length');
    console.log(data.length);

    //data = data.replaceAll('d.employeeName', info['employeeName']);
    //console.log(data);
    //data = data.replaceAll('d.requireMayRequire', info['requireMayRequire']);
    //data = data.replaceAll('d.humanResourcesDepartmentName', info['humanResourcesDepartmentName']);
    //data = data.replaceAll('d.position', info['position']);
    var converted = htmlDocxJs.asBlob(data);
    var doclink = req.user.accessCode + '-Background Check Policy IL.docx';
    var ep = new AWS.Endpoint('https://storage.googleapis.com');
    var s3bucket = new AWS.S3({params: {Bucket: 'herokustorage711'  },endpoint: ep});
    console.log('s3bucket.endpoint.hostname');
    console.log(s3bucket.endpoint.hostname);
  }
  if (s3bucket) {
    //var s3bucket = new AWS.S3({params: {Bucket: 'herokustorage711'}});
    s3bucket.createBucket(function () {
      var params = {
          Key: req.user.accessCode + '-Background Check Policy IL.docx', //file.name doesn't exist as a property
          Body: converted
      };
      s3bucket.upload(params, function (err, data) {
        if (err) {
          console.log('ERROR MSG: ', err);
          res.status(500).send(err);
        } else {
          console.log('Successfully uploaded data');
          res.status(200).end();
        }
      });
    });

    var docapprove = await DocApprove.findOne({user: req.user.email})
    if (!docapprove) {
      docapprove = new DocApprove({
        user: req.user.email,
        approver: approver['email'],
        link: [{
          url: doclink,
          status: "Not approved",
          date: Date.now()
        }]
      });
      docapprove.save();
    }
    else {
      docapprove['link'].push({
        url: doclink,
        status: "Not approved",
        date: Date.now()
      });
      docapprove.save();
    }

  }

  Chat.findOne({username: req.user.username}).then(result => {

    if (!result) {
      var chat = new Chat({
        username: req.user.username, content: [{
          sender: req.user.username,
          text: content,
          date: Date.now()
        }, {
          sender: "Elaina",
          text: resultText,
          date: Date.now()
        }]
      })
      chat.save()
    }
    else {
      // var chatContent = result.content;
      result.content.push({ sender: req.user.username, text: content, date: Date.now() });
      result.content.push({ sender: "Elaina", text: resultText, date: Date.now() });
      result.save();
      // Chat.update({username: req.user.username}, {content: chatContent}, upsert = true);
    }
    // res.json({ status: "success", data: resultText });
  }).catch(err => {
    res.json({ status: "error" });
  })
  return res.json({ status: "success", data: resultText });
};

// Display list of all books.
exports.getChats = async function (req, res) {
  let user = req.user;
  let chatcontent = [];
  Chat.findOne({ username: user.username }).then((result) => {
    if (!result) {
      req.session['sessionPath'] = myDialogflow.getSessionPath();
      sessionPath = req.session['sessionPath'];
      var firstHello = 'Hi';
      myDialogflow.chat(firstHello, sessionPath).then(resultText => {
        var chat = new Chat({
          username: user.username, 
          content: [{
            sender: "Elaina",
            text: resultText,
            date: Date.now()
          }]
        })
        chat.save()
        content = [{
          sender: "Elaina",
          text: resultText,
          date: Date.now()
        }]
        res.json({ status: "success", data: content});
      });
    }
    else {
      chatcontent = []
      result.content.map(content => {
        chatcontent.push({
          sender: content.sender,
          text: content.text,
          date: content.date
        })
      });
      res.json({ status: "success", data: chatcontent });
    }
  });
};

// Display detail page for a specific book.
exports.book_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};