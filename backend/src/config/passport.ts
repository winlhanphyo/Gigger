import passport from "passport";
import passportJWT from "passport-jwt";
// import OAuth2Strategy from 'passport-google-oauth';
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

import { UserDbModel } from "../database";

var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;

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

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:3000/auth/google/callback"
// },
// function (accessToken: any, refreshToken: any, profile: any, done: any) {
//     const user = profile;
//     console.log('user-----', user);
//     return done(null, user);
// }
// ));

console.log('--------client id', process.env.GOOGLE_CLIENT_ID);
console.log('--------client secret', process.env.GOOGLE_CLIENT_SECRET);

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/api/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken: any, refreshToken: any, profile: any, callback: any) {
			callback(null, profile);
		}
	)
);