import { IUserModel, UserDbModel } from "../../database";

class AuthService {

/**
 * user signup 
 * @param userObj 
 * @returns 
 */
  async signupUser(userObj: Partial<IUserModel>): Promise<UserDbModel> {
    const createUser = await UserDbModel.create({ ...userObj, createdAt: new Date().toISOString() });
    console.log(createUser);
    return createUser;
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