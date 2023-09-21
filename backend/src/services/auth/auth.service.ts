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
        interest: req.body.interest,
        // verifyAccount: true
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

      const interest = await GenreDbModel.findAll({
        where: {
          id: result.dataValues.interest
        }
      });
      result.dataValues.interest = interest;

      const token = crypto.randomBytes(16).toString("hex");
      const domainUrl = "https://gigger-api.orionmmtecheng.com";
      const link = `${domainUrl}/verify-email/${createUser.dataValues.id}/${token}`;
      const html = `<!DOCTYPE html>
<html>
<head>
</head>
<body style="background-color: #EF562B; color: #FEF6F3;">
  <div class="container" style="margin: 10px;">
    <h3>Gigger</h3>
    <div style="text-align: center; color: #FEF6F3;">
      <div style="font-size: 12px; margin-bottom: 30px;">
        Hello Username01
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

      const mail = await sendEmail(createUser.dataValues.email, "User Signup Verification mail", true, html);

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