"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.authController = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const passport_1 = __importDefault(require("passport"));
const auth_service_1 = require("../../services/auth/auth.service");
require('../../config/passport');
let AuthController = class AuthController {
    /**
     * user signup
     * @param req
     * @param res
     */
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield auth_service_1.authService.signupUser(req, res);
            return result;
        });
    }
    /**
     * user login
     * @param req
     * @param res
     * @returns
     */
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield auth_service_1.authService.loginUser(req, res);
            return userData;
        });
    }
    signUpProUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield auth_service_1.authService.signUpProUser(req, res);
            return userData;
        });
    }
    /**
     * login with google
     * @param req
     * @param res
     */
    loginWithGoogle(req, res) {
        console.log('login With Google');
        passport_1.default.authenticate('google', { scope: ['profile', 'email'] });
    }
    /**
     * google call back function.
     * @param req
     * @param res
     */
    googleCallBack(req, res) {
        console.log('---------google callback function');
        passport_1.default.authenticate('google', { failureRedirect: 'api/google/error' }),
            res.send("google signin success");
    }
    /**
     * user logout
     * @param req
     * @param res
     * @returns
     */
    logout(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.headers["userid"];
                const user = yield auth_service_1.authService.logoutUser(userId);
                if (!user) {
                    return res.status(400).json({
                        message: "Logout User Id is not found"
                    });
                }
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split('')[1];
                req.logout(function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.json({ "message": "Logout Successfully" });
                });
                // req.session.destroy();
                // req.logout(function(err: any) {
                //   if (err) { return next(err); }
                //   res.redirect('/');
                // });
                // return res.json({ "message": "Logout Successfully" });
                // });
            }
            catch (err) {
                console.log('------update event error----', err);
                return res.status(400).json({
                    message: err.toString()
                });
            }
        });
    }
    ;
    /**
     * login with google error.
     * @param req
     * @param res
     */
    loginWithGoogleError(req, res) {
        res.status(401).json({
            error: true,
            message: "Log in failure",
        });
    }
};
AuthController = __decorate([
    autobind_decorator_1.default
], AuthController);
exports.authController = new AuthController();
