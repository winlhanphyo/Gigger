import express from "express";

import { authController } from "../../controllers/auth/auth.controller";

const router =express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);
router.get('/auth/google', authController.loginWithGoogle);
router.get('/auth/google/error', authController.loginWithGoogleError);
router.get('/logout', authController.logout);
router.post('/auth/google/callback', authController.googleCallBack);

export default router;
