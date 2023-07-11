import passport from "passport";

import passportJWT from "passport-jwt";

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