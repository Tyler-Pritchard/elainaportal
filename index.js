const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Document');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } );

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize()); 
app.use(passport.session());
    
// load passport strategies
// const localSignupStrategy = require('./passport/local-signup');
// const localLoginStrategy = require('./passport/local-login');
// passport.use('local-signup', localSignupStrategy);
// passport.use('local-login', localLoginStrategy);

// passport.serializeUser((user, done) => {
//   done(null, user.id)
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id)
//   .then(user => {
//     done(null, user);
//   });
// });

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/documentRoutes')(app);
require('./routes/router');

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/requireLogin');
app.use('/api', authCheckMiddleware);

if (process.env.NODE_ENV === 'production') {
  //invalid prod command due to directory structure -- Fix in Heroku -TRP
  app.use(express.static('https://elaina-view.herokuapp.com'));

  const path = require('path');
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
  console.log(`serving on http://localhost:${PORT}`);
});