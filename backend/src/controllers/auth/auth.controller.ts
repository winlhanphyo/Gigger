import autobind from "autobind-decorator";
import { Response } from "express";
import bcrypt, { compareSync } from "bcrypt";
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { authService } from "../../services/auth/auth.service";
import { IUserModel } from "../../database";
require('../../config/passport');

@autobind

class AuthController {
/**
 * user signup
 * @param req 
 * @param res 
 */
  async signup(req: any, res: Response) {

    const userData: IUserModel = {
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      role: req.body.role,
      dob: req.body.dob,
      interest: req.body.interest
    } as any;

    const result = await authService.signupUser(userData);

    res.json({
      message: 'User sign up successfully',
      data: result
    });
  }

  /**
   * user login
   * @param req 
   * @param res 
   * @returns 
   */
  async login(req: any, res: Response): Promise<any> {
    const username = req.body.username as any;
    const userData = await authService.loginUser(username);

    if (!userData) {
      return res.status(404).send("User is not found");
    }
    console.log('userData.password', userData.password, 'password', req.body.password);
    if (!compareSync(req.body.password, userData.password)) {
      return res.status(400).send({
        success: false,
        message: 'Incorrect Password'
      })
    }

    const payload = {
      username: userData.username,
      id: userData.id
    }
    const token = jwt.sign(payload, 'secrect', { expiresIn: '1d' });

    return res.status(200).send({
      success: true,
      message: 'Login Successfully!',
      users: userData,
      token: token
    });
  }

  /**
   * login with google
   * @param req 
   * @param res 
   */
  loginWithGoogle(req: any, res: Response) {
    console.log('login With Google');
    passport.authenticate('google', { scope : ['profile', 'email'] })
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
  async logout(req: any, res: Response): Promise<any> {
    req.session = null;
    return res.json({ "message": "Logout Successfully" });
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