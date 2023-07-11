import autobind from "autobind-decorator";
import { Response } from "express";
import bcrypt, { compareSync } from "bcrypt";
import jwt from 'jsonwebtoken';
import { authService } from "../../services/auth/auth.service";
import { IUserModel } from "../../database";

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
   * user logout
   * @param req 
   * @param res 
   * @returns 
   */
  async logout(req: any, res: Response): Promise<any> {
    req.session = null;
    return res.json({ "message": "Logout Successfully" });
  };
}

export const authController = new AuthController();