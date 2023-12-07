import autobind from "autobind-decorator";
import { Response } from "express";
import passport from 'passport';
import { authService } from "../../services/auth/auth.service";
require('../../config/passport');
import {oauth2Client} from '../../config/passport';

@autobind

class AuthController {
  /**
   * user signup
   * @param req 
   * @param res 
   */
  async signup(req: any, res: Response) {
    const result = await authService.signupUser(req, res);
    return result;
  }

  /**
   * user login
   * @param req 
   * @param res 
   * @returns 
   */
  async login(req: any, res: Response): Promise<any> {
    const userData = await authService.loginUser(req, res);
    return userData;
  }

  async signUpProUser(req: any, res: Response): Promise<any> {
    const userData = await authService.signUpProUser(req, res);
    return userData;
  }

  /**
   * login with google
   * @param req 
   * @param res 
   */
  loginWithGoogle(req: any, res: Response) {
    // console.log('login With Google');
    passport.authenticate('google', { scope: ['profile', 'email'] });
    res.sendStatus(200);
    // passport.authenticate('google', { 
    //   scope: ['profile', 'email'],
    //   callbackURL: '/auth/google/callback'
    // });
  }

  /**
   * google call back function.
   * @param req
   * @param res 
   */
  async googleCallBack(req: any, res: Response) {
    console.log('---------google callback function');

    const code = req.query.code;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    passport.authenticate('google', {
      successRedirect: '/api/auth/google/success',
      failureRedirect: '/api/auth/google/failure'
    });
    res.sendStatus(200);
  }

  /**
   * user logout
   * @param req 
   * @param res 
   * @returns 
   */
  async logout(req: any, res: Response, next: any): Promise<any> {
    try {
      const userId = req.headers["userid"];
      const user = await authService.logoutUser(userId);
      if (!user) {
        return res.status(400).json({
          message: "Logout User Id is not found"
        });
      }
      const token = req.headers.authorization?.split('')[1];
      req.logout(function (err: any) {
        if (err) { return next(err); }
        return res.json({ "message": "Logout Successfully" });
      });
      // req.session.destroy();
      // req.logout(function(err: any) {
      //   if (err) { return next(err); }
      //   res.redirect('/');
      // });
      // return res.json({ "message": "Logout Successfully" });
      // });
    } catch (err: any) {
      console.log('------update event error----', err);
      return res.status(400).json({
        message: err.toString()
      });
    }
  };

  /**
   * forget password.
   * @param req 
   * @param res 
   */
  async forgetPassword(req: any, res: any) {
    const data = await authService.forgetPassword(req, res);
    return data;
  }

  /**
   * reset password.
   * @param req 
   * @param res 
   * @returns 
   */
  async resetPassword(req: any, res: any) {
    const data = await authService.resetPassword(req, res);
    return data;
  }

  /**
   * login with google error.
   * @param req 
   * @param res 
   */
  loginWithGoogleError(req: any, res: Response): any {
    res.status(401).json({
      error: true,
      message: "Log in failure",
    });
  }

  /**
   * login with google success.
   * @param req 
   * @param res 
   */
  loginWithGoogleSuccess(req: any, res: Response): any {
    res.json({
      success: true,
      message: "Google Login Successful!",
    });
  }
}

export const authController = new AuthController();