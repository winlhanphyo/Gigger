"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
// import OAuth2Strategy from 'passport-google-oauth';
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const database_1 = require("../database");
var JwtStrategy = passport_jwt_1.default.Strategy;
var ExtractJwt = passport_jwt_1.default.ExtractJwt;
/**
 * JWT Authentication
 */
passport_1.default.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secrect'
}, function (jwtPayload, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield database_1.UserDbModel.findByPk(jwtPayload.id);
        return cb(null, user);
    });
}));
passport_1.default.serializeUser((user, done) => {
    var _a;
    console.log('user', user.dataValues.id);
    if ((_a = user === null || user === void 0 ? void 0 : user.dataValues) === null || _a === void 0 ? void 0 : _a.id) {
        done(null, user.dataValues.id);
    }
    else {
        done(null, false);
    }
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('id', id);
    const USER = yield database_1.UserDbModel.findOne({
        where: {
            id
        }
    });
    if (USER) {
        done(null, USER);
    }
    else {
        done(null, false);
    }
}));
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
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    scope: ["profile", "email"],
}, function (accessToken, refreshToken, profile, callback) {
    callback(null, profile);
}));
