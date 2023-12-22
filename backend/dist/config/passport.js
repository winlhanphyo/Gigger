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
exports.oauth2Client = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const googleapis_1 = require("googleapis");
// import OAuth2Strategy from 'passport-google-oauth';
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport_google_oauth20_1 = require("passport-google-oauth20");
const database_1 = require("../database");
var JwtStrategy = passport_jwt_1.default.Strategy;
var ExtractJwt = passport_jwt_1.default.ExtractJwt;
const calendar = googleapis_1.google.calendar({
    version: "v3",
    auth: "AIzaSyB3HHe7xCBUyN0yt0xnMcbozvr8N0iXe9Y"
});
exports.oauth2Client = new googleapis_1.google.auth.OAuth2("648492758078-57jgi987oia7e46mprdsg4umnaee8kkp.apps.googleusercontent.com", "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", "https://gigger-api.orionmmtecheng.com/api/auth/google/callback");
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
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URL,
    scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/calendar'
    ],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
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
})));
