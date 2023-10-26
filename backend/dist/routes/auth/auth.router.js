"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controllers/auth/auth.controller");
const router = express_1.default.Router();
router.post('/signup', auth_controller_1.authController.signup);
router.post('/pro/signup', auth_controller_1.authController.signup);
router.post('/forget-password', auth_controller_1.authController.forgetPassword);
router.post('/password-reset-update/:userId/:token', auth_controller_1.authController.resetPassword);
router.post('/login', auth_controller_1.authController.login);
router.get('/auth/google', auth_controller_1.authController.loginWithGoogle);
router.get('/auth/google/error', auth_controller_1.authController.loginWithGoogleError);
router.get('/logout', auth_controller_1.authController.logout);
router.post('/auth/google/callback', auth_controller_1.authController.googleCallBack);
exports.default = router;
