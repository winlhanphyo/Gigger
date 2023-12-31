"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.authService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importStar(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const utils_1 = require("../../utils/utils");
const database_1 = require("../../database");
const passwordReset_model_1 = require("../../database/models/passwordReset.model");
class AuthService {
    /**
     * user signup
     * @param req
     * @param res
     * @returns
     */
    signupUser(req, res) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = yield database_1.UserDbModel.findOne({
                    where: {
                        username: req.body.username
                    }
                });
                if (username && ((_a = username === null || username === void 0 ? void 0 : username.dataValues) === null || _a === void 0 ? void 0 : _a.verifyAccount)) {
                    return res.status(400).json({
                        success: false,
                        message: "Username is already taken"
                    });
                }
                const email = yield database_1.UserDbModel.findOne({
                    where: {
                        email: req.body.email
                    }
                });
                if (email && ((_b = username === null || username === void 0 ? void 0 : username.dataValues) === null || _b === void 0 ? void 0 : _b.verifyAccount)) {
                    return res.status(400).json({
                        success: false,
                        message: "Email is already taken"
                    });
                }
                const userData = {
                    username: req.body.username,
                    email: req.body.email,
                    password: yield bcrypt_1.default.hash(req.body.password, 12),
                    role: req.body.role,
                    dob: req.body.dob,
                    interest: req.body.interest,
                    verifyAccount: false
                };
                let resUser = null;
                if (!username && !email && !((_c = username === null || username === void 0 ? void 0 : username.dataValues) === null || _c === void 0 ? void 0 : _c.verifyAccount)) {
                    resUser = yield database_1.UserDbModel.create(Object.assign(Object.assign({}, userData), { createdAt: new Date().toISOString() }));
                }
                else {
                    userData.id = ((_d = username === null || username === void 0 ? void 0 : username.dataValues) === null || _d === void 0 ? void 0 : _d.id) || ((_e = email === null || email === void 0 ? void 0 : email.dataValues) === null || _e === void 0 ? void 0 : _e.id);
                    resUser = yield database_1.UserDbModel.update(userData, {
                        where: { id: userData.id }
                    });
                }
                const id = ((_f = resUser === null || resUser === void 0 ? void 0 : resUser.dataValues) === null || _f === void 0 ? void 0 : _f.id) || (userData === null || userData === void 0 ? void 0 : userData.id);
                let result = yield database_1.UserDbModel.findOne({
                    where: {
                        id
                    },
                    include: [
                        {
                            model: database_1.UserRoleDbModel,
                            as: 'user_role'
                        },
                    ],
                });
                const interest = yield database_1.GenreDbModel.findAll({
                    where: {
                        id: result.dataValues.interest
                    }
                });
                result.dataValues.interest = interest;
                const token = crypto_1.default.randomBytes(16).toString("hex");
                const domainUrl = "https://gigger-api.orionmmtecheng.com";
                // const domainUrl = "http://localhost:3000";
                const link = `${domainUrl}/verify-email/${id}/${token}`;
                const html = `<!DOCTYPE html>
<html>
<head>
</head>
<body style="background-color: #EF562B; color: #FEF6F3;">
  <div class="container" style="margin: 10px;">
    <h3>Gigger</h3>
    <div style="text-align: center; color: #FEF6F3;">
      <div style="font-size: 12px; margin-bottom: 30px;">
        Hello ${req.body.username}
      </div>
      <div style="font-size: 20px; margin-bottom: 10px;">
        JUST ONE MORE STEP TO THE TOP
      </div>
      <div style="font-size: 12px; margin-bottom: 30px;">
        (if you wanna Rock'n Roll)
      </div>
      <div style="font-size: 18px; margin-bottom: 10px;">
        VERIFY YOUR EMAIL ADDRESS
      </div>
      <div style="font-size: 12px; margin-bottom: 30px;">
        Please click on the button to activate your account
      </div>
      <div style="padding-bottom: 15px;">
        <a href=${link} style="background-color: #EF552B; color: white; padding: 14px 70px; text-align: center; text-decoration: none; display: inline-block; border: 2px solid rgba(0,0,0,0.19); border-radius: 45px;">
          Verify my account
        </a>
      </div>
    </div>
  </div>
</body>
</html>`;
                const mail = yield (0, utils_1.sendEmail)(req.body.email, "Il tuo Account Google è attivo: ora fai crescere la tua attività", true, html);
                // const payload = {
                //   username: result.username,
                //   id: result.id
                // }
                // const loginToken = jwt.sign(payload, 'secrect', { expiresIn: '1d' });
                res.json({
                    success: true,
                    message: 'User sign up successfully and Verification email is sent to your account.',
                    users: result
                });
            }
            catch (e) {
                console.log('------get signup API error----', e);
                return res.status(400).json({
                    success: false,
                    message: e.toString()
                });
            }
        });
    }
    /**
     * user login service.
     * @param req
     * @param res
     * @returns
     */
    loginUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.body.username;
                const userData = yield database_1.UserDbModel.findOne({
                    where: {
                        username: username
                    }
                });
                if (!userData) {
                    return res.status(404).send("User is not found");
                }
                if (!(0, bcrypt_1.compareSync)(req.body.password, userData.password)) {
                    return res.status(400).send({
                        success: false,
                        message: 'Incorrect Password'
                    });
                }
                if (!((_a = userData === null || userData === void 0 ? void 0 : userData.dataValues) === null || _a === void 0 ? void 0 : _a.verifyAccount)) {
                    return res.status(400).send({
                        success: false,
                        message: 'Your account is not verified.'
                    });
                }
                const payload = {
                    username: userData.username,
                    id: userData.id
                };
                const token = jsonwebtoken_1.default.sign(payload, 'secrect', { expiresIn: '1d' });
                const interest = yield database_1.GenreDbModel.findAll({
                    where: {
                        id: userData.dataValues.interest
                    }
                });
                userData.dataValues.interest = interest;
                const genre = yield database_1.GenreDbModel.findAll({
                    where: {
                        id: userData.dataValues.genre
                    }
                });
                userData.dataValues.genre = genre;
                return res.status(200).send({
                    success: true,
                    message: 'Login Successfully!',
                    users: userData,
                    token: token
                });
            }
            catch (e) {
                console.log('user login API Error', e.toString());
                return res.status(400).json({
                    success: false,
                    message: e.toString()
                });
            }
        });
    }
    signUpProUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const param = req.body;
                let productList = [
                    {
                        price_data: {
                            currency: "eur",
                            product_data: {
                                name: param.planName,
                            },
                            unit_amount: param.price,
                        },
                        quantity: 1,
                    }
                ];
                const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
                const domainUrl = param.domainUrl;
                param === null || param === void 0 ? true : delete param.domainUrl;
                const session = yield stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: productList,
                    mode: "payment",
                    payment_intent_data: {
                        metadata: {
                            orderId: param.loginId,
                        },
                    },
                    // shipping_address_collection: {
                    //   allowed_countries: ['US', 'SG', "IT"],
                    // },
                    // custom_text: {
                    //   shipping_address: {
                    //     message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
                    //   },
                    //   submit: {
                    //     message: 'We\'ll email you instructions on how to get started.',
                    //   },
                    // },
                    // success_url: domainUrl + "/payment/success",
                    // cancel_url: domainUrl + "/payment/cancel",
                });
                // return res.json({ id: session.id });
                res.json(session);
            }
            catch (err) {
                console.log('Stripe API Error', err);
                throw {
                    success: false,
                    message: err.toString()
                };
            }
        });
    }
    /**
     * user logout
     * @param id
     * @returns
     */
    logoutUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield database_1.UserDbModel.findOne({
                    where: {
                        id
                    }
                });
            }
            catch (err) {
                return {
                    success: false,
                    message: "Logout API error"
                };
            }
        });
    }
    /**
     * forget password.
     * @param req
     * @param res
     * @returns
     */
    forgetPassword(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield database_1.UserDbModel.findOne({
                    where: {
                        email: req.body.email,
                    }
                });
                if (!user)
                    return res.status(400).send("Email does not exist");
                let passwordReset = yield passwordReset_model_1.PasswordResetDbModel.findOne({
                    where: {
                        email: req.body.email
                    }
                });
                let token = (_a = passwordReset === null || passwordReset === void 0 ? void 0 : passwordReset.dataValues) === null || _a === void 0 ? void 0 : _a.token;
                if (!((_b = passwordReset === null || passwordReset === void 0 ? void 0 : passwordReset.dataValues) === null || _b === void 0 ? void 0 : _b.token)) {
                    token = crypto_1.default.randomBytes(16).toString("hex");
                    const passwordResetData = {
                        email: req.body.email,
                        token
                    };
                    const createPasswordReset = yield passwordReset_model_1.PasswordResetDbModel.create(Object.assign(Object.assign({}, passwordResetData), { createdAt: new Date().toISOString() }));
                }
                const link = `${process.env.BASE_URL}/forget-password-update/${user.dataValues.id}/${passwordReset === null || passwordReset === void 0 ? void 0 : passwordReset.dataValues.token}`;
                const msg = `Here is the password reset link \n ${link}`;
                const mail = yield (0, utils_1.sendEmail)(user.email, "Oscar Password Reset", false, msg);
                res.status(200).json({
                    message: "Password reset link sent to your email account."
                });
            }
            catch (err) {
                console.log('error');
                res.status(400).send("An error occured" + err.toString());
            }
        });
    }
    /**
     * reset password.
     * @param req
     * @param res
     */
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield database_1.UserDbModel.findOne({
                    where: {
                        id: req.params.userId
                    }
                });
                if (!user)
                    return res.status(400).send("User Id does not exist");
                const passwordReset = yield passwordReset_model_1.PasswordResetDbModel.findOne({
                    where: {
                        token: req.params.token
                    }
                });
                if (!passwordReset)
                    return res.status(400).send("Invalid link or expired");
                const userData = {
                    password: yield bcrypt_1.default.hash(req.body.password, 12),
                };
                const updateUser = yield database_1.UserDbModel.update(userData, {
                    where: { id: user.dataValues.id }
                });
                yield passwordReset.destroy();
                res.json({
                    message: "Password reset sucessfully."
                });
            }
            catch (err) {
                res.status(400).send("An error occured " + err.toString());
            }
        });
    }
}
exports.authService = new AuthService();
