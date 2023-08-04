import autobind from "autobind-decorator";
import { Response } from "express";
import passport from 'passport';
import { authService } from "../../services/auth/auth.service";
require('../../config/passport');

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

  /**
   * login with google
   * @param req 
   * @param res 
   */
  loginWithGoogle(req: any, res: Response) {
    console.log('login With Google');
    passport.authenticate('google', { scope: ['profile', 'email'] })
  }

  /**
   * google call back function.
   * @param req
   * @param res 
   */
  googleCallBack(req: any, res: Response) {
    console.log('---------google callback function');
    passport.authenticate('google', { failureRedirect: 'api/google/error' }),
      res.send("google signin success");
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
          msg: "Logout User Id is not found"
        });
      }
      const token = req.headers.authorization.slipt('')[1];
      console.log('token', token);
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
        msg: err.toString()
      });
    }
  };

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
}

export const authController = new AuthController();