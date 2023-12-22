import express from "express";
import passport from 'passport';
import { authController } from "../../controllers/auth/auth.controller";

const router =express.Router();

router.post('/signup', authController.signup);
router.post('/pro/signup', authController.signup);
router.post('/forget-password', authController.forgetPassword);
router.post('/password-reset-update/:userId/:token', authController.resetPassword);

router.post('/login', authController.login);
router.get('/auth/google/callback', authController.googleCallBack);
router.post('/auth/google/success', passport.authenticate('google'), authController.loginWithGoogleSuccess);
router.get('/auth/google/failure', passport.authenticate('google'), authController.loginWithGoogleError);
router.get('/auth/google', authController.loginWithGoogle);
router.get('/logout', authController.logout);
export default router;
