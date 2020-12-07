const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const models = require('./models');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } );

var app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize()); 
app.use(passport.session());
    
require('./routes/authRoutes')(app);
  // require('./routes/billingRoutes')(app);
require('./routes/router')(app);
    

    //load passport strategies
  const localSignupStrategy = require('./passport/local-signup');
  const localLoginStrategy = require('./passport/local-login');
  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login', localLoginStrategy);

  passport.serializeUser((user, done) => {
    done(null, user.id)
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    });
  });


  //Strategies for OAuth Login:  Add Facebook, LinkedIn -TRP
  const GoogleStrategy = require('passport-google-oauth20').Strategy;

  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("***ACCESS TOKEN***", accessToken);
        console.log("***REFRESH TOKEN***", refreshToken);
        console.log("***GOOGLE PROFILE***", profile);
        const existingUser = await User.findOne({ googleId: profile.id});
        
        if (existingUser) {
          return done(null, existingUser);
        }
        
        const user = await new User({goodleId: profile.id }).save();
        done(null, user);
      }
    )
  );


  // pass the authenticaion checker middleware
// const authCheckMiddleware = require('./middleware/requireLogin');

// app.use('/api', authCheckMiddleware);

global.__basedir = __dirname;

var routes = require('./routes/router');
app.use(routes);

var auth = require('./routes/authRoutes');
//var billing = require('./routes/billingRoutes');
app.use(auth);
// app.use(billing);

app.use(express.static(__dirname + '/dashboard'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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