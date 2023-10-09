
import bcrypt from "bcrypt";
import moment from "moment";
import path from "path";
import { GenreDbModel, UserDbModel } from "../../database";
import { UserLikeViewProfileDbModel } from "../../database/models/userLikeViewProfile.model";
import { PAGINATION_LIMIT, USER_THUMBNAIL_PATH, USER_VIDEO_PATH } from "../../utils/constant";
import { deleteFile } from "../../utils/utils";

class UserService {

  /**
   * get users list.
   * @param req 
   * @param res 
   * @returns 
   */
  async getUserList(req: any, res: any): Promise<any> {
    try {
      let offset = Number(req.query.page) - 1 || 0;
      const limit = Number(req.query.size) || PAGINATION_LIMIT;
      let page = offset * limit;
      const userList = await UserDbModel.findAll({
        limit,
        offset: page,
        // include: [
        //   {
        //     model: VideoDbModel,
        //     through: { attributes: [] }
        //   }
        // ]
      }) as any;
      for (let i = 0; i < userList.length; i++) {
        let genre = userList[i].dataValues?.genre;
        if (genre) {
          console.log('genre', genre);
          const genreList = await GenreDbModel.findAll({
            where: {
              id: genre
            }
          });
          console.log('genreList', genreList);
          userList[i].dataValues.genre = genreList;
        }

        let interest = userList[i].dataValues?.interest;
        if (interest) {
          const interestList = await GenreDbModel.findAll({
            where: {
              id: interest
            }
          });
          userList[i].dataValues.interest = interestList;

        }
        return res.json({
          count: userList.length,
          data: userList
        });
      }
    } catch (e: any) {
      console.log('------get Artist API Error----', e);
      return res.status(400).json({
        message: e.toString()
      });
    }
  }

  /**
   * create user.
   * @param req 
   * @param res 
   * @returns 
   */
  async createUser(req: any, res: any) {
    try {
      let profile: string = req.body.profile;
      if (req.files?.profile?.length > 0) {
        profile = req.files.profile[0].path?.split("\\").join("/");
      }

      const userData = {
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
        role: req.body.role,
        profile,
        highlight: req.body.highlight,
        address: req.body.address,
        description: req.body.description,
        status: req.body.status,
        instrument: req.body.instrument,
      } as any;

      const addUserData = (dist: any, propName: any, data: any) => {
        let obj = JSON.parse(JSON.stringify(data));
        if (typeof obj === 'object' && obj !== null) {
          if (obj?.hasOwnProperty(propName) && req.body[propName]) {
            dist[propName] = obj[propName];
            if (propName === 'dob') {
              // Parse the date string using Moment.js
              const date = moment(obj[propName], "YYYY-MM-DD");
              dist[propName] = date;
            } else if (propName === "interest") {
              dist[propName] = JSON.parse(obj[propName]);
            }
          }
        }
      }

      const paramList = ["dob", "interest", "phone", "services", "experiences", "studies", "achievements", "customTitle", "instagram",
        "youtube", "facebook", "twitter", "tiktok", "website"];

      for (let i = 0; i <= paramList.length; i++) {
        addUserData(userData, paramList[i], req.body);
      }
      const createUser = await UserDbModel.create({ ...userData, createdAt: new Date().toISOString() });

      console.log('createUser', createUser);
      if (createUser?.dataValues?.interest) {
        const interest = await GenreDbModel.findAll({
          where: {
            id: createUser.dataValues.interest
          }
        });
        createUser.dataValues.interest = interest;
      }

      if (createUser?.dataValues?.genre) {
        const genre = await GenreDbModel.findAll({
          where: {
            id: createUser.dataValues.genre
          }
        });
        createUser.dataValues.genre = genre;
      }

      return res.json({
        message: 'User is created successfully',
        data: createUser
      });
    } catch (e: any) {
      console.log("Create User API Error", e);
      return res.status(400).json({
        message: e.toString()
      });
    }
  }

  /**
   * delete file data.
   * @param data 
   * @param dataPath 
   */
  deleteFileData = (data: any, dataPath: string) => {
    if (data) {
      const rootDir = path.join(__dirname, "../../" + dataPath);
      const filePath = path.join(rootDir, data);
      deleteFile(filePath);
    }
  }

  /**
   * update User data.
   * @param req
   * @param res
   */
  async updateUser(req: any, res: any): Promise<any> {
    try {
      const id = +req.params.id
      const checkUser = await this.getUserDataWithId(id, res);
      if (!checkUser) {
        return res.status(404).json({
          message: "User is not found"
        });
      }

      const userData = {
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
        role: req.body.role,
        name: req.body.name,
        highlight: req.body.highlight,
        address: req.body.address,
        description: req.body.description,
        status: req.body.status,
        instrument: req.body.instrument,
        updatedAt: new Date().toISOString()
      } as any;

      const addUserData = (dist: any, propName: any, data: any) => {
        let obj = JSON.parse(JSON.stringify(data));
        if (typeof obj === 'object' && obj !== null) {
          if (obj?.hasOwnProperty(propName) && req.body[propName]) {
            dist[propName] = obj[propName];
            if (propName === 'dob') {
              // Parse the date string using Moment.js
              const date = moment(obj[propName], "YYYY-MM-DD");
              dist[propName] = date;
            }
          }
        }
      }

      const paramList = ["dob", "interest", "phone", "services", "experiences", "studies", "achievements", "customTitle", "instagram",
        "youtube", "facebook", "twitter", "tiktok", "website"];

      for (let i = 0; i <= paramList.length; i++) {
        addUserData(userData, paramList[i], req.body);
      }

      let profile: any = req.body.profile;
      if (req.files?.profile?.length > 0) {
        profile = req.files.profile[0].path?.split("\\").join("/");
        if (checkUser.profile) {
          this.deleteFileData(checkUser.profile, USER_THUMBNAIL_PATH);
        }
        if (checkUser) {
          userData.profile = profile;
        }
      }

      userData.id = +req.params.id;
      const updateUser = await UserDbModel.update(userData, {
        where: { id: userData.id as number }
      });

      return res.json({
        message: 'User is updated successfully',
        data: updateUser
      });
      return updateUser;
    } catch (e: any) {
      console.log("Create User API Error", e);
      return res.status(400).json({
        message: e.toString()
      });
    }
  }

  /**
   * delete user.
   * @param req
   * @param res 
   * @returns 
   */
  async deleteUser(req: any, res: any): Promise<UserDbModel> {
    try {
      const id = req.params.id;

      const detailUser = await UserDbModel.findOne({
        where: {
          id
        }
      }) as any;

      if (!detailUser) {
        return res.status(400).json({
          message: "User is not found by this id"
        });
      }

      if (detailUser?.dataValues?.video) {
        this.deleteFileData(detailUser.dataValues.video, USER_VIDEO_PATH);
      }

      const removeUserData = await UserDbModel.destroy(
        {
          where: {
            id
          },
        }
      );

      return res.json({
        message: `Delete User is successful.`,
        data: removeUserData
      });
    } catch (e: any) {
      console.log("Delete User API Error", e);
      return res.status(400).json({
        message: e.toString()
      });
    }
  }

  /**
   * get User by Id.
   * @param req
   * @param res
   * @returns 
   */
  async getUserById(req: any, res: any): Promise<any> {
    try {
      const id = +req.params.id;
      const userData = await this.getUserDataWithId(id, res);
      return res.json({
        data: userData
      });
    } catch (e: any) {
      console.log("--Get User By Id API Error---", e);
      return res.status(400).json({
        message: e.toString(),
      });
    }
  }

  /**
   * get user profile.
   * @param req 
   * @param res 
   * @returns 
   */
  async getUserProfile(req: any, res: any): Promise<any> {
    try {
      const id = +req.params.id;
      const userId = req.headers["userid"];
      const userData = await this.getUserDataWithId(id, res);

      const getCountData = async (id: any, status: any) => {
        const count = await UserLikeViewProfileDbModel.count({
          where: {
            artistId: id,
            status
          }
        });
        return count;
      }

      // like and view follow count for profile.
      if (userData) {
        const likeCount = await getCountData(userData.dataValues.id, "like");
        userData.dataValues.likeCount = this.formatNumber(likeCount);

        const viewCount = await getCountData(userData.dataValues.id, "view");
        userData.dataValues.viewCount = this.formatNumber(viewCount);

        const followCount = await getCountData(userData.dataValues.id, "follow");
        userData.dataValues.followCount = this.formatNumber(followCount);

        const dist = await UserLikeViewProfileDbModel.findAll({
          where: {
            artistId: id,
            userId: parseInt(userId)
          }
        });
  
        if (dist.length > 0) {
          userData.dataValues.like = dist.some((data) => data.dataValues.status === 'like');
          userData.dataValues.view = dist.some((data) => data.dataValues.status === 'view');
          userData.dataValues.follow = dist.some((data) => data.dataValues.status === 'follow');
        } else {
          userData.dataValues.like = false;
          userData.dataValues.view = false;
          userData.dataValues.follow = false;
        }
      }

      return res.json({
        data: userData
      });
    } catch (e: any) {
      console.log("--Get User By Id API Error---", e);
      return res.status(400).json({
        message: e.toString(),
      });
    }
  }

  /**
   * add status profile (for user's profile like and view)
   * @param userLikeViewProfileData 
   * @param res
   * @returns 
   */
  async addStatusUserProfile(userLikeViewProfileData: any, res: any): Promise<any> {
    try {
      const profile = await this.getUserDataWithId(userLikeViewProfileData.artistId, res);
      if (!profile) {
        res.status(400).json({
          message: "User Profile is not found by this id"
        });
      }

      const count = await UserLikeViewProfileDbModel.count({
        where: {
          artistId: userLikeViewProfileData.artistId,
          userId: parseInt(userLikeViewProfileData.userId),
          status: userLikeViewProfileData.status
        }
      });

      if (count > 0) {
        return res.json({
          message: `User already ${userLikeViewProfileData.status} this profile`,
        });
      }

      const createLikeViewProfile = await UserLikeViewProfileDbModel.create({ ...userLikeViewProfileData, createdAt: new Date().toISOString() });
      return res.json({
        message: `Add Profile ${userLikeViewProfileData.status} Status is successful.`,
        data: createLikeViewProfile
      });
    } catch (e: any) {
      console.log(`------Add Profile Status Error----`, e);
      return res.status(400).json({
        message: e.toString()
      });
    }
  }

  /**
   * remove profile status.
   * @param userId 
   * @param artistId 
   * @param status 
   * @param res 
   * @returns 
   */
  async removeStatusUserProfile(userId: any, artistId: any, status: any, res: any): Promise<any> {
    try {
      const profile = this.getUserDataWithId(artistId, res);
      if (!profile) {
        res.status(400).json({
          message: "Profile is not found by this id"
        });
      }
      const removeLikeViewProfile = await UserLikeViewProfileDbModel.destroy(
        {
          where: {
            userId,
            artistId,
            status
          },
        }
      );
      return res.json({
        message: `Remove User Profile ${status} Status is successful.`,
        data: removeLikeViewProfile
      });
    } catch (e: any) {
      console.log('------Remove User Profile Status Error----', e);
      return res.status(400).json({
        message: e.toString()
      });
    }
  }

  /**
   * get user data with id.
   * @param id 
   * @param res 
   * @returns 
   */
  async getUserDataWithId(id: any, res: any) {
    try {
      const userData = await UserDbModel.findOne({
        where: {
          id
        }
      }) as any;
      console.log('user data', userData);
      if (!userData) {
        return res.status(404).json({
          message: "User data is not found by this id"
        });
      }
      let genre = userData.dataValues?.genre;
      if (genre) {
        const genreList = await GenreDbModel.findAll({
          where: {
            id: genre
          }
        });
        userData.dataValues.genre = genreList;
      }

      let interest = userData.dataValues?.interest;
      if (interest) {
        const interestList = await GenreDbModel.findAll({
          where: {
            id: interest
          }
        });
        userData.dataValues.interest = interestList;
      }
      return userData;
    } catch (e: any) {
      console.log("--Get User By Id API Error---", e);
      return res.status(400).json({
        message: e.toString(),
      });
    }
  }

  /**
   * format number like 20K, 1M.
   * @param num 
   * @returns 
   */
  formatNumber(num: any) {
    if (typeof num !== 'number') {
      return "Invalid Input";
    }

    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  }

  /**
   * account verify after user signup.
   * @param req 
   * @param res 
   */
  async verifyAccount(req: any, res: any): Promise<any> {
    try {
      const id = +req.params.id
      const checkUser = await this.getUserDataWithId(id, res);
      if (!checkUser) {
        return res.status(404).json({
          message: "User is not found"
        });
      }

      const param = {
        verifyAccount: true
      };
      console.log('checkUser', checkUser);
      const rootDir = path.join(__dirname, "../../../");
      const response = await UserDbModel.update(param, { where: { id }, });
      return res.sendFile(path.join(rootDir, 'success.html'));
    } catch (e: any) {
      console.log("Verify Account API Error", e);
      return res.status(400).json({
        message: e.toString()
      });
    }
  }
}

export const userService = new UserService();