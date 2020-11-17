// const keys = require('../config/keys');
// const stripe = require('stripe')(keys.stripeSecretKey);
// const requireLogin = require('../middleware/requireLogin');

// module.exports = app => {
//     app.post('/api/stripe', requireLogin, async (req, res) => {
//         if (!req.user) {
//             return res.status(401).send({error: 'You must log in'});
//         }

//         const charge = await stripe.charges.create({
//             amount: 5000,
//             currency: 'usd',
//             description: 'Legal Services',
//             source: req.body.id
//         });
//         req.user.hours += 1;
//         const user = await req.user.save();

//         res.send(user);
//     });
// };