import passport from "passport";
import passportJWT from "passport-jwt";
import { google } from 'googleapis';
// import OAuth2Strategy from 'passport-google-oauth';
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from 'passport-google-oauth20';
import { UserDbModel } from "../database";

var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;

const calendar = google.calendar({
  version: "v3",
  auth: "AIzaSyB3HHe7xCBUyN0yt0xnMcbozvr8N0iXe9Y"
})

export const oauth2Client = new google.auth.OAuth2(
  "648492758078-57jgi987oia7e46mprdsg4umnaee8kkp.apps.googleusercontent.com",
  "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",
  "https://gigger-api.orionmmtecheng.com/api/auth/google/callback"
)

/**
 * JWT Authentication
 */
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secrect'
},
  async function (jwtPayload: any, cb: any) {

    const user = await UserDbModel.findByPk(jwtPayload.id);

    return cb(null, user);
  }
));

passport.serializeUser((user: any, done) => {
  console.log('user', user.dataValues.id);
  if (user?.dataValues?.id) {
    done(null, user.dataValues.id);
  } else {
    done(null, false);
  }
});

passport.deserializeUser(async (id, done) => {
  console.log('id', id);
  const USER = await UserDbModel.findOne(
    {
      where: {
        id
      }
    }
  );
  if (USER) {
    done(null, USER);
  } else {
    done(null, false);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/calendar'
      ],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      console.log('------------thenn login');
      console.log(accessToken);
      console.log(profile);
      // const USER = await UserDbModel.findOne(
      //   {
      //     where: {
      //       email: profile.email
      //     }
      //   }
      // );
      // if (USER) {
      //   done(null, USER);
      // } else {
      //   done(null, false);
      // }
      done(null, { username: profile.displayName });
    }
  )
);