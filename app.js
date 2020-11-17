// require('dotenv').config();
var fs = require('fs');
var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    session = require('express-session'),
    morgan  = require('morgan'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors');
    errorhandler = require('errorhandler');
    // require("./models/chat");
    // require("./models/user");
    
// var keys = require('config/keys');
var User = require('./models/user');

const cookieSession = require('cookie-session');
// Create global app object
var app = express();

app.use(cors());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey]
//   })
//   );
  app.use(morgan('dev'));
  mongoose.connect('mongodb+srv://newtest:incredible@cluster0-atfmx.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true } );

  // tell the app to parse HTTP body messages
  // pass the passport middleware
  app.use(passport.initialize());
  
  //OAuth passport & routes
  app.use(passport.session());
  
  // require('./routes/authRoutes')(app);
  // require('./routes/billingRoutes')(app);
  

  // load passport strategies
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

  // const GoogleStrategy = require('passport-google-oauth20').Strategy;
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: keys.googleClientID,
  //       clientSecret: keys.googleClientSecret,
  //       callbackURL: '/auth/google/callback',
  //       proxy: true
  //     },
  //     async (accessToken, refreshToken, profile, done) => {
  //       console.log("***ACCESS TOKEN***", accessToken);
  //       console.log("***REFRESH TOKEN***", refreshToken);
  //       console.log("***GOOGLE PROFILE***", profile);
  //       const existingUser = await User.findOne({ googleId: profile.id});
        
  //       if (existingUser) {
  //         return done(null, existingUser);
  //       }
        
  //       const user = await new User({goodleId: profile.id }).save();
  //       done(null, user);
  //     }
  //   )
  // );
  // pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/requireLogin');

app.use('/api', authCheckMiddleware);

global.__basedir = __dirname;

var routes = require('./routes/router');
app.use(routes);

// var auth = require('./routes/authRoutes');
// var billing = require('./routes/billingRoutes');
// app.use(auth);
// app.use(billing);

app.use(express.static(__dirname + '/dashboard'));

// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
  console.log(`serving on http://localhost:${PORT}`);
});