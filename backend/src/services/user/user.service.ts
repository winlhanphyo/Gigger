
import bcrypt from "bcrypt";
import { GenreDbModel, UserDbModel, UserRoleDbModel, UserVideoDbModel, VideoDbModel } from "../../database";
import { UserLikeViewVideoDbModel } from "../../database/models/userLikeViewVideo.model";
import { PAGINATION_LIMIT } from "../../utils/constant";
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
      const offset = Number(req.query.page) || 0;
      const limit = Number(req.query.size) || PAGINATION_LIMIT;
      const userList = await UserDbModel.findAll({
        limit,
        offset,
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
          const genreList = await GenreDbModel.findAll({
            where: {
              id: genre
            }
          });
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
        msg: e.toString()
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
      const id = +req.params.id;
      if (req.files?.profile?.length > 0) {
        profile = req.files.profile[0].path.replaceAll("\\", "/");
      }

      const userData = {
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
        role: req.body.role,
        dob: req?.body?.dob ? req.body.dob : null,
        interest: req.body?.interest ? req.body.interest : null,
        profile,
        highlight: req.body.highlight,
        address: req.body.address,
        description: req.body.description,
        status: req.body.status
      } as any;
      const createUser = await UserDbModel.create({ ...userData, createdAt: new Date().toISOString() });
      return res.json({
        message: 'User is created successfully',
        data: createUser
      });
    } catch (e: any) {
      console.log("Create User API Error", e);
      return res.status(400).json({
        msg: e.toString()
      });
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
      const checkUser = await this.getUserById(req, res);
      if (!checkUser) {
        return res.status(404).json({
          msg: "User is not found"
        });
      }

      const userData = {
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
        role: req.body.role,
        dob: req?.body?.dob ? req.body.dob : null,
        interest: req.body?.interest ? req.body.interest : null,
        name: req.body.name,
        highlight: req.body.highlight,
        address: req.body.address,
        description: req.body.description,
        status: req.body.status
      } as any;

      let profile: any = req.body.profile;
      if (req.files?.profile?.length > 0) {
        profile = req.files.profile[0].path.replace("\\", "/");
        if (checkUser.profile && checkUser.profile != profile) {
          deleteFile(checkUser.profile);
        }
        if (checkUser) {
          userData.profile = profile;
        }
      }

      userData.id = +req.params.id;
      const updateUser = await UserDbModel.update(userData, {
        where: { id: userData.id as number }
      });
      return updateUser;
    } catch (e: any) {
      console.log("Create User API Error", e);
      return res.status(400).json({
        msg: e.toString()
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
      const userData = await UserDbModel.findOne({
        where: {
          id
        },
        // include: [
        //   {
        //     model: VideoDbModel,
        //     through: { attributes: [] }
        //   }
        // ]
      }) as any;
      console.log('user data', userData);
      if (!userData) {
        return res.status(404).json({
          msg: "User data is not found by this id"
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
      return res.json({
        data: userData
      });
    } catch (e: any) {
      console.log("--Get User By Id API Error---", e);
      return res.status(400).json({
        msg: e.toString(),
      });
    }
  }

  /**
   * add status video (for user's video like and view)
   * @param userLikeViewVideoData 
   * @param res
   * @returns 
   */
  async addStatusVideo(userLikeViewVideoData: any, res: any): Promise<any> {
    try {
      const video = await this.getVideoById(userLikeViewVideoData.videoId);
      console.log("video-------", video);
      if (!video) {
        res.status(400).json({
          msg: "Video is not found by this id"
        });
      }

      const count = await UserLikeViewVideoDbModel.count({
        where: {
          videoId: userLikeViewVideoData.videoId,
          userId: userLikeViewVideoData.userId,
          status: userLikeViewVideoData.status
        }
      });

      if (count > 0) {
        return res.json({
          message: `User already ${userLikeViewVideoData.status} this video`,
        });
      }

      const createLikeViewVideo = await UserLikeViewVideoDbModel.create({ ...userLikeViewVideoData, createdAt: new Date().toISOString() });
      return res.json({
        message: `Add Vido ${userLikeViewVideoData.status} Status is successful.`,
        data: createLikeViewVideo
      });
    } catch (e: any) {
      console.log(`------Add Video Status Error----`, e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * remove video status.
   * @param userId 
   * @param videoId 
   * @param status 
   * @param res 
   * @returns 
   */
  async removeStatusVideo(userId: any, videoId: any, status: any, res: any): Promise<any> {
    try {
      const video = this.getVideoById(videoId);
      if (!video) {
        res.status(400).json({
          msg: "Video is not found by this id"
        });
      }
      const removeLikeViewVideo = await UserLikeViewVideoDbModel.destroy(
        {
          where: {
            userId,
            videoId,
            status
          },
        }
      );
      return res.json({
        message: `Remove Video ${status} Status is successful.`,
        data: removeLikeViewVideo
      });
    } catch (e: any) {
      console.log('------Remove Video Status Error----', e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * create user video to upload.
   * @param userId
   * @param userVideoObj 
   * @returns 
   */
  async createUserVideo(req: any, res: any): Promise<UserVideoDbModel> {
    try {
      let video: string = "";
      const userId = req.headers['userid'];

      const checkVideoCount = await this.getVideoByUserId(userId);
      if (checkVideoCount?.length > 0 && checkVideoCount[0]?.dataValues?.users?.length > 0 && checkVideoCount[0]?.dataValues?.users[0]?.dataValues?.user_role
        && checkVideoCount[0]?.dataValues?.users[0]?.dataValues?.user_role?.dataValues?.name) {
        const role = checkVideoCount[0]?.dataValues?.users[0]?.dataValues?.user_role?.dataValues?.name;
        if (role === "Free Account" && checkVideoCount?.length > 9) {
          return res.json({
            message: `Free User Account uploaded only 9 videos.`,
          });
        } else if (role === "Pro Account" && checkVideoCount?.length > 30) {
          return res.json({
            message: `Pro User Account uploaded only 30 videos`
          });
        }
      }

      if (req.files?.video?.length > 0) {
        video = req.files.video[0].path.replaceAll("\\", "/");
      }

      const splitFileName = video.split("/");
      console.log('split file name', splitFileName);
      const filename = splitFileName[splitFileName.length - 1];
      console.log('filename', filename);

      const userVideoObj = {
        name: req.body.name,
        description: req.body.description,
        video: filename
      } as any;

      const createVideo = await VideoDbModel.create({ ...userVideoObj, createdAt: new Date().toISOString() });
      if (createVideo?.dataValues?.id) {
        const createUserVideoData = await UserVideoDbModel.create({
          userId,
          videoId: createVideo?.dataValues?.id
        });
      }
      return res.json({
        message: `Video is uploaded successfully.`,
        data: createVideo
      });
    } catch (e: any) {
      console.log("Upload Video API Error", e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * delete user video.
   * @param req
   * @param res 
   * @returns 
   */
  async deleteVideo(req: any, res: any): Promise<UserVideoDbModel> {
    try {
      const videoId = req.params.id;
      const userId = req.headers["userId"];
      console.log('video id, user id', videoId, userId);
      const detailVideo = await this.getVideoById(videoId);
      console.log('-------detail video-------', detailVideo);
      if (!detailVideo) {
        return res.status(400).json({
          msg: "Video is not found by this id"
        });
      } else if (detailVideo?.dataValues?.users?.length > 0 &&
        detailVideo?.dataValues?.users[0]?.dataValues?.id === userId) {
        return res.status(400).json({
          msg: "This video is not your uploaded video."
        })
      }

      const video = await VideoDbModel.destroy(
        {
          where: {
            id: videoId
          },
        }
      );
      deleteFile(detailVideo.dataValues.video);

      const userVideo = await UserVideoDbModel.destroy(
        {
          where: {
            videoId
          }
        }
      );

      const removeLikeViewVideo = await UserLikeViewVideoDbModel.destroy(
        {
          where: {
            videoId
          },
        }
      );

      return res.json({
        message: `Delete Video is successful.`,
        data: video
      });
    } catch (e: any) {
      console.log("Upload Video API Error", e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * top User video list by pagination.
   * @param req 
   * @param res 
   * @returns 
   */
   async topVideoList(req: any, res: any) {
    try {
      const userId = req.headers['userid'];
      const userData = await UserDbModel.findOne({
        where: {
          id: userId
        }
      }) as any;

      let offset = Number(req.query.page) || 0;
      let limit = Number(req.query.size) || PAGINATION_LIMIT;
      let condition: any = {};
      if (userData?.dataValues?.interest > 0) {
        condition = {
          genre: userData.dataValues.interest
        }
      }
      const allVideoCount = await VideoDbModel.count({
        include: [
          {
            model: UserDbModel,
            through: { attributes: [] },
            where: condition
          }
        ]
      }) as any;

      const count = allVideoCount - (limit * (offset + 1));

      let videoList = await this.getVideoForTop(limit, offset, condition);
      if (allVideoCount < count) {
        limit = limit - videoList.length;
        offset = (count - allVideoCount)/limit;
        const preVideoId = videoList?.dataValues?.map((data: any) => data.id);
        condition = {
          id: { $ne : preVideoId }
        };
        let nextVideoList = await this.getVideoForTop(limit, offset, condition);
        videoList = [...videoList, ...nextVideoList];
      }

      // like and view count for video.
      if (videoList?.length > 0) {
        for (let i = 0; i < videoList.length; i++) {
          const likeCount = await UserLikeViewVideoDbModel.count({
            where: {
              videoId: videoList[i].dataValues.id,
              status: 'like'
            }
          });
          videoList[i].dataValues.likeCount = this.formatNumber(likeCount);

          const viewCount = await UserLikeViewVideoDbModel.count({
            where: {
              videoId: videoList[i].dataValues.id,
              status: 'view'
            }
          });
          videoList[i].dataValues.viewCount = this.formatNumber(viewCount);
        }
      }

      return res.json({
        data: videoList,
        count: videoList.length
      });
    } catch (e: any) {
      console.log('------Video List API Error----', e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * get Video For Home Page.
   * @param limit 
   * @param offset 
   * @param condition 
   * @returns 
   */
  async getVideoForTop(limit: any, offset: any, condition:any) {
    try {
      const videoList = await VideoDbModel.findAll({
        limit,
        offset,
        include: [
          {
            model: UserDbModel,
            through: { attributes: [] },
            where: condition
          }
        ]
      }) as any;
      return videoList;
    } catch (err: any) {
      console.log('get Video For Top API Error', err);
      return null;
    }
  }

  /**
   * video list by pagination.
   * @param req 
   * @param res 
   * @returns 
   */
  async videoList(req: any, res: any) {
    try {
      const offset = Number(req.query.page) || 0;
      const limit = Number(req.query.size) || PAGINATION_LIMIT;
      const videoList = await VideoDbModel.findAll({
        limit,
        offset,
        include: [
          {
            model: UserDbModel,
            through: { attributes: [] }
          }
        ]
      }) as any;

      // like and view count for video.
      if (videoList?.length > 0) {
        for (let i = 0; i < videoList.length; i++) {
          const likeCount = await UserLikeViewVideoDbModel.count({
            where: {
              videoId: videoList[i].dataValues.id,
              status: 'like'
            }
          });
          videoList[i].dataValues.likeCount = this.formatNumber(likeCount);

          const viewCount = await UserLikeViewVideoDbModel.count({
            where: {
              videoId: videoList[i].dataValues.id,
              status: 'view'
            }
          });
          videoList[i].dataValues.viewCount = this.formatNumber(viewCount);
        }
      }

      return res.json({
        data: videoList,
        count: videoList.length
      });
    } catch (e: any) {
      console.log('------Video List API Error----', e);
      return res.status(400).json({
        msg: e.toString()
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
   * get video by id
   * @param id 
   */
  async getVideoById(id: any) {
    const video = await VideoDbModel.findOne({
      where: {
        id
      },
      include: [
        {
          model: UserDbModel,
          through: { attributes: [] },
          include: [
            {
              model: UserRoleDbModel,
              as: "user_role",
            }
          ]
        }
      ]
    }) as any;
    return video;
  }

  /**
   * get video by user id.
   * @param id 
   * @returns 
   */
  async getVideoByUserId(id: any) {
    const user = await VideoDbModel.findAll({
      include: [
        {
          model: UserDbModel,
          through: { attributes: [] },
          where: { id },
          include: [
            {
              model: UserRoleDbModel,
              as: "user_role",
            }
          ]
        }
      ]
    }) as any;
    return user;
  }
}

export const userService = new UserService();