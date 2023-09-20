import jwt from 'jsonwebtoken';
import bcrypt, { compareSync } from "bcrypt";
import crypto from "crypto";
import { sendEmail } from "../../utils/utils";
import { GenreDbModel, IUserModel, UserDbModel, UserRoleDbModel } from "../../database";

class AuthService {

  /**
   * user signup 
   * @param req
   * @param res 
   * @returns 
   */
  async signupUser(req: any, res: any) {
    try {
      const userData: IUserModel = {
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
        role: req.body.role,
        dob: req.body.dob,
        interest: req.body.interest
      } as any;
      const createUser: any = await UserDbModel.create({ ...userData, createdAt: new Date().toISOString() });
      let result = await UserDbModel.findOne({
        where: {
          id: createUser.dataValues.id,
        },
        include: [
          {
            model: UserRoleDbModel,
            as: 'user_role'
          },
        ],
      }) as any;

      const genre = await GenreDbModel.findAll({
        where: {
          id: result.dataValues.interest
        }
      });
      delete result.dataValues.interest;
      result.dataValues.genre = genre;

      const token = crypto.randomBytes(16).toString("hex");
      const domainUrl = "https://gigger-api.orionmmtecheng.com";
      const link = `${domainUrl}/verify-email/${createUser.dataValues.id}/${token}`;
      const msg = `Verify your email address \n ${link}`;
      const mail = await sendEmail(createUser.dataValues.email, "User Signup Verification mail", msg);

      res.json({
        message: 'User sign up successfully and Verification email is sent to your account.',
        data: result
      });
    } catch (e: any) {
      console.log('------get event list API error----', e);
      return res.status(400).json({
        msg: e.toString()
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

      if (!userData.verifyAccount) {
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

      return res.status(200).send({
        success: true,
        message: 'Login Successfully!',
        users: userData,
        token: token
      });
    } catch (e: any) {
      console.log('user login API Error', e.toString());
      return res.status(400).json({
        msg: e.toString()
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
        payment_intent_data:  {
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
      throw err.toString();
    }
  }

  /**
   * user logout
   * @param id 
   * @returns 
   */
  async logoutUser(id: any): Promise<any> {
    return await UserDbModel.findOne({
      where: {
        id
      }
    }) as any;
  }

}

export const authService = new AuthService();