import { GenreDbModel, IUserModel, UserDbModel, UserRoleDbModel } from "../../database";

class AuthService {

/**
 * user signup 
 * @param userObj 
 * @returns 
 */
  async signupUser(userObj: Partial<IUserModel>): Promise<UserDbModel> {
    const createUser: any = await UserDbModel.create({ ...userObj, createdAt: new Date().toISOString() });
    let res = await UserDbModel.findOne({
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
          id: res.dataValues.interest
      }
    });
    delete res.dataValues.interest;
    res.dataValues.genre = genre;
    return res;
  }

  /**
   * user login
   * @param username 
   * @returns 
   */
  loginUser(username: string): Promise<any> {
    return UserDbModel.findOne({
      where: {
        username: username
      }
    }) as any;
  }

  /**
   * user logout
   * @param username 
   * @returns 
   */
  logoutUser(username: string): Promise<any> {
    return UserDbModel.findOne({
      where: {
        username: username
      }
    }) as any;
  }

}

export const authService = new AuthService();