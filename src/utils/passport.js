import User from '../models/user.model';
import dotenv from 'dotenv';
dotenv.config();



const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/v1/users/auth/google/callback',
      passReqToCallback: true
    },
    function (accessToken, refreshToken, profile, callback) {
      console.log("Output ===> profile:", profile);
      
      return callback(null, profile);
    }
  )
);

