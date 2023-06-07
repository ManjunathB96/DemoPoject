import User from '../models/user.model';
import dotenv from 'dotenv';
dotenv.config();

const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID:GOOGLE_CLIENT_ID,
      clientSecret:GOOGLE_CLIENT_SECRET,
      callbackURL:'http://localhost:4000/api/v1/users/auth/google/callback',
      passReqToCallback:true
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("Output ===> profile:", profile);
      return done(err, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});