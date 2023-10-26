import jwt from 'jsonwebtoken';
import bcrypt, { compareSync } from "bcrypt";
import crypto, { verify } from "crypto";
import { sendEmail } from "../../utils/utils";
import { GenreDbModel, IUserModel, UserDbModel, UserRoleDbModel } from "../../database";
import { PasswordResetDbModel } from '../../database/models/passwordReset.model';

class AuthService {

  /**
   * user signup 
   * @param req
   * @param res 
   * @returns 
   */
  async signupUser(req: any, res: any) {
    try {
      const username = await UserDbModel.findOne({
        where: {
          username: req.body.username
        }
      }) as any;

      if (username && username?.dataValues?.verifyAccount) {
        return res.status(400).json({
          success: false,
          message: "Username is already taken"
        });
      }

      const email = await UserDbModel.findOne({
        where: {
          email: req.body.email
        }
      }) as any;

      if (email && username?.dataValues?.verifyAccount) {
        return res.status(400).json({
          success: false,
          message: "Email is already taken"
        });
      }

      const userData: IUserModel = {
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
        role: req.body.role,
        dob: req.body.dob,
        interest: req.body.interest,
        verifyAccount: false
      } as any;

      let resUser: any = null;

      if (!username && !email && !username?.dataValues?.verifyAccount) {
        resUser = await UserDbModel.create({ ...userData, createdAt: new Date().toISOString() });
      } else {
        userData.id = username?.dataValues?.id || email?.dataValues?.id;
        resUser = await UserDbModel.update(userData, {
          where: { id: userData.id as number }
        });
      }
      const id = resUser?.dataValues?.id || userData?.id;

      let result = await UserDbModel.findOne({
        where: {
          id
        },
        include: [
          {
            model: UserRoleDbModel,
            as: 'user_role'
          },
        ],
      }) as any;

      const interest = await GenreDbModel.findAll({
        where: {
          id: result.dataValues.interest
        }
      });
      result.dataValues.interest = interest;

      const token = crypto.randomBytes(16).toString("hex");
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

      const mail = await sendEmail(req.body.email, "Il tuo Account Google è attivo: ora fai crescere la tua attività", true, html);

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
    } catch (e: any) {
      console.log('------get signup API error----', e);
      return res.status(400).json({
        success: false,
        message: e.toString()
      });
    }
  }

  /**
   * user login service.
   * @param req
   * @param res 
   * @returns 
   */
  async loginUser(req: any, res: any): Promise<any> {
    try {
      const username = req.body.username as any;
      const userData = await UserDbModel.findOne({
        where: {
          username: username
        }
      }) as any;

      if (!userData) {
        return res.status(404).send("User is not found");
      }
      if (!compareSync(req.body.password, userData.password)) {
        return res.status(400).send({
          success: false,
          message: 'Incorrect Password'
        })
      }

      if (!userData?.dataValues?.verifyAccount) {
        return res.status(400).send({
          success: false,
          message: 'Your account is not verified.'
        });
      }

      const payload = {
        username: userData.username,
        id: userData.id
      }
      const token = jwt.sign(payload, 'secrect', { expiresIn: '1d' });

      const interest = await GenreDbModel.findAll({
        where: {
          id: userData.dataValues.interest
        }
      });
      userData.dataValues.interest = interest;

      const genre = await GenreDbModel.findAll({
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
    } catch (e: any) {
      console.log('user login API Error', e.toString());
      return res.status(400).json({
        success: false,
        message: e.toString()
      });
    }
  }

  async signUpProUser(req: any, res: any): Promise<any> {
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
      delete param?.domainUrl;

      const session = await stripe.checkout.sessions.create({
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

    } catch (err: any) {
      console.log('Stripe API Error', err);
      throw {
        success: false,
        message: err.toString()
      }
    }
  }

  /**
   * user logout
   * @param id 
   * @returns 
   */
  async logoutUser(id: any): Promise<any> {
    try {
      return await UserDbModel.findOne({
        where: {
          id
        }
      }) as any;
    } catch (err) {
      return {
        success: false,
        message: "Logout API error"
      }
    }
  }

  /**
   * forget password.
   * @param req 
   * @param res 
   * @returns 
   */
  async forgetPassword(req: any, res: any): Promise<any> {
    try {
      const user = await UserDbModel.findOne({
        where: {
          email: req.body.email,
        }
      }) as any;
      if (!user)
        return res.status(400).send("Email does not exist");

      let passwordReset = await PasswordResetDbModel.findOne({
        where: {
          email: req.body.email
        }
      });
      let token = passwordReset?.dataValues?.token;
      if (!passwordReset?.dataValues?.token) {
        token = crypto.randomBytes(16).toString("hex");
        const passwordResetData = {
          email: req.body.email,
          token
        };
        const createPasswordReset: any = await PasswordResetDbModel.create({ ...passwordResetData, createdAt: new Date().toISOString() });
      }

      const link = `${process.env.BASE_URL}/forget-password-update/${user.dataValues.id}/${passwordReset?.dataValues.token}`;
      const msg = `Here is the password reset link \n ${link}`;
      const mail = await sendEmail(user.email, "Oscar Password Reset", false, msg);

      res.status(200).json({
        message: "Password reset link sent to your email account."
      });
    } catch (err: any) {
      console.log('error');
      res.status(400).send("An error occured" + err.toString());
    }
  }

  /**
   * reset password.
   * @param req 
   * @param res 
   */
  async resetPassword(req: any, res: any) {
    try {
      const user = await UserDbModel.findOne({
        where: {
          id: req.params.userId
        }
      });
      if (!user) return res.status(400).send("User Id does not exist");

      const passwordReset = await PasswordResetDbModel.findOne({
        where: {
          token: req.params.token
        }
      });
      if (!passwordReset) return res.status(400).send("Invalid link or expired");

      const userData = {
        password: await bcrypt.hash(req.body.password, 12),
      } as any;
      const updateUser = await UserDbModel.update(userData, {
        where: { id: user.dataValues.id as number }
      });
      await passwordReset.destroy();

      res.json({
        message: "Password reset sucessfully."
      });
    } catch (err: any) {
      res.status(400).send("An error occured " + err.toString());
    }
  }

}

export const authService = new AuthService();