import jwt from 'jsonwebtoken';
import bcrypt, { compareSync } from "bcrypt";
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
      res.json({
        message: 'User sign up successfully',
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