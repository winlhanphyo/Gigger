import { IUserVideoModel, UserDbModel, UserRoleDbModel, UserVideoDbModel, VideoDbModel } from "../../database";
import { UserLikeViewVideoDbModel } from "../../database/models/userLikeViewVideo.model";
import { PAGINATION_LIMIT } from "../../utils/constant";
import { deleteFile } from "../../utils/utils";


class UserService {

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