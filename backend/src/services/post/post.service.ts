import { FindOptions } from "sequelize";
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
import path from "path";
import { GenreDbModel, IPostModel, PostDbModel, PostInputModel, UserDbModel, UserRoleDbModel } from "../../database";
import { UserLikeViewPostDbModel } from "../../database/models/userLikeViewPost.model";
import { PAGINATION_LIMIT, USER_VIDEO_PATH, USER_THUMBNAIL_PATH } from "../../utils/constant";
import { deleteFile } from "../../utils/utils";

class PostService {
  /**
   * get posts list.
   * @param postAttributes 
   * @param otherFindOptions 
   * @returns 
   */
  async getPostList(postAttributes?: Array<any>, otherFindOptions?: FindOptions, offset?: number, limit?: number, res?: any): Promise<any> {
    try {
      limit = limit && limit > 0 ? limit : undefined;
      let postList = await PostDbModel.findAll({
        ...otherFindOptions,
        attributes: postAttributes,
        limit,
        offset,
        include: [
          {
            model: UserDbModel,
            as: "createdByUser"
          },
          {
            model: UserDbModel,
            as: "updatedByUser"
          }
        ]
      });

      for (let i = 0; i < postList.length; i++) {
        let music = JSON.parse(postList[i].dataValues?.music);
        if (music) {
          console.log('music', music);
          const interestList = await GenreDbModel.findAll({
            where: {
              id: music
            }
          });
          console.log('interestList', interestList);
          postList[i].dataValues.music = interestList;
        }
      }

      return res.json({
        count: postList.length,
        data: postList
      });

    } catch (e: any) {
      console.log('------get post list API error----', e);
      return res.status(400).json({
        message: e.toString()
      });
    }
  }

  /**
   * create post data.
   * @param postObj 
   * @returns 
   */
  async createPost(req: any, res: any): Promise<PostDbModel> {
    try {
      let video: string = "";
      let filename: string = "";

      const userId = req.headers['userid'];
      const checkVideoCount = await this.getVideoByUserId(userId);
      console.log('checkVideoCount', checkVideoCount[0]?.dataValues);
      if (checkVideoCount?.length > 0 && checkVideoCount[0]?.dataValues?.createdByUser?.dataValues?.user_role
        && checkVideoCount[0]?.dataValues?.createdByUser?.dataValues?.user_role?.dataValues?.name) {
        const role = checkVideoCount[0]?.dataValues?.createdByUser?.dataValues?.user_role?.dataValues?.name;
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

      const postObj: IPostModel = {
        caption: req.body.caption,
        music: JSON.parse(req.body.music),
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        advertisementFormat: req.body.advertisementFormat,
        searchResult: req.body.searchResult,
        giglistClassifieds: req.body.giglistClassifieds,
        targetAudience: req.body.targetAudience,
        privateContent: req.body.privateContent,
        memberShipContent: req.body.memberShipContent,
        forMyFollowersOnly: req.body.forMyFollowersOnly,
        createdUser: req.headers['userid']
      } as any;

      if (req.files?.video?.length > 0) {
        console.log('video', req.files.video[0]?.path);
        video = req.files.video[0]?.path?.split("\\").join("/");
        const splitFileName = video.split("/");
        console.log('split file name', splitFileName);
        filename = splitFileName[splitFileName.length - 1];
        console.log('filename', filename);
        postObj.video = filename;
        const response = await new Promise((resolve, reject) => {
          setTimeout(async () => {
            postObj.thumbnail = await this.saveThumbnail(filename);
            resolve(null);
          }, 4000);
        });
      }

      const createPost = await PostDbModel.create({ ...postObj, createdAt: new Date().toISOString() });
      return res.json({
        message: 'Post is created successfully',
        data: createPost
      });
    } catch (e: any) {
      console.log("-----Create Post API error----", e);
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
   * update Post data.
   * @param req 
   * @param res 
   */
  async updatePost(req: any, res: any): Promise<any> {
    try {
      const id = +req.params.id;
      let video: string = "";
      let filename: string = "";
      const detailPost = await postService.getPostById(id);

      if (!detailPost) {
        return res.status(404).send("Post is not found");
      }

      const postObj: IPostModel = {
        caption: req.body.caption,
        music: JSON.parse(req.body.music),
        // address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        advertisementFormat: req.body.advertisementFormat,
        searchResult: req.body.searchResult,
        giglistClassifieds: req.body.giglistClassifieds,
        targetAudience: req.body.targetAudience,
        privateContent: req.body.privateContent,
        memberShipContent: req.body.memberShipContent,
        forMyFollowersOnly: req.body.forMyFollowersOnly,
        postId: req.body.postId,
        updatedUser: req.headers['userid'],
        updatedAt: new Date().toISOString()
      } as any;

      postObj.id = +req.params.id;

      if (req.files?.video?.length > 0) {
        if (detailPost?.dataValues?.video) {
          this.deleteFileData(detailPost.dataValues.video, USER_VIDEO_PATH);
        }

        if (detailPost?.dataValues?.thumbnail) {
          this.deleteFileData(detailPost.dataValues.thumbnail, USER_THUMBNAIL_PATH);
        }

        video = req.files.video[0].path?.split("\\").join("/");
        const splitFileName = video.split("/");
        console.log('split file name', splitFileName);
        filename = splitFileName[splitFileName.length - 1];
        postObj.video = filename;
        const response = await new Promise((resolve, reject) => {
          setTimeout(async () => {
            postObj.thumbnail = await this.saveThumbnail(filename);
            resolve(null);
          }, 20000);
        });
      }

      const updatePostData = await PostDbModel.update(postObj, {
        where: { id: postObj.id as number }
      });
      return res.json({
        message: 'Post is updated successfully',
        data: updatePostData
      });
    } catch (e: any) {
      console.log('------update post error----', e);
      return res.status(400).json({
        message: e.toString()
      });
    }
  }

  /**
   * save thumbnail image and get thumbnail file name
   * @param filename 
   * @returns 
   */
  async saveThumbnail(filename: any): Promise<string> {
    // save thumnail image
    const thumbnailFilename = filename.split(".mp4")[0];
    const inputFilePath = path.resolve("upload/user/video" + "/", filename);
    const outputFilePath = path.resolve("upload/user/thumbnail" + "/");
    ffmpeg.setFfmpegPath(ffmpegPath);
    const response = await ffmpeg(inputFilePath)
      // setup event handlers
      .on('filenames', function (filenames: any) {
        console.log('screenshots are ' + filenames.join(', '));
      })
      .on('end', function () {
        console.log('screenshots were saved');
      })
      .on('error', function (err: any) {
        console.log('an error happened: ' + err.message);
      })
      // take a single screenshot at the specified timemark and size
      .takeScreenshots({
        count: 1,
        timemarks: ['00:00:02.000'], // Specify the desired timemark
        size: '600x600',
        filename: thumbnailFilename + '.png', // Include the file extension here
      }, outputFilePath);
    const thumbnailPath = USER_THUMBNAIL_PATH + "/" + thumbnailFilename + ".png";
    return thumbnailPath.split("upload/").join("api/");
  }

  /**
   * get Post by Id.
   * @param post_id 
   * @returns 
   */
  async getPostById(post_id: number, res: any = null): Promise<any> {
    try {
      const postData = await PostDbModel.findOne({
        where: {
          id: post_id
        },
        include: [
          {
            model: UserDbModel,
            as: "createdByUser"
          },
          {
            model: UserDbModel,
            as: "updatedByUser"
          }
        ]
      }) as any;
      console.log('Post Data', postData);

      let music = JSON.parse(postData.dataValues?.music);
      if (music) {
        const interestList = await GenreDbModel.findAll({
          where: {
            id: music
          }
        });
        postData.dataValues.music = interestList;
      }

      if (!postData) {
        return res.status(404).json({
          message: "Post data is not found by this id"
        });
      }

      if (res) {
        return res.json({
          data: postData
        })
      } else {
        return postData;
      }

    } catch (e: any) {
      console.log("--Get Post By Id API Error---", e);
      if (res) {
        return res.status(400).json({
          message: e.toString()
        });
      } else {
        return null;
      }
    }
  }

  /**
   * get Video With UserId.
   * @param req 
   * @param res 
   */
  async getVideoWithUserId(req: any, res: any): Promise<any> {
    try {
      const id = +req.params.id;
      const videoList = await this.getVideoByUserId(id);
      return res.json({
        count: videoList.length,
        data: videoList
      });
    } catch (e: any) {
      console.log('------get video list with UserId API error----', e);
      return res.status(400).json({
        message: e.toString()
      });
    }
  }

  /**
 * get video by user id.
 * @param id 
 * @returns 
 */
  async getVideoByUserId(id: any) {
    const user = await PostDbModel.findAll({
      include: [
        {
          model: UserDbModel,
          as: "createdByUser",
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

  /**
   * delete post.
   * @param req
   * @param res 
   * @returns 
   */
  async deletePost(req: any, res: any): Promise<PostDbModel> {
    try {
      const id = req.params.id;
      const userId = req.headers["userid"];
      const detailPost = await this.getPostById(id);
      if (!detailPost) {
        return res.status(400).json({
          message: "Post is not found by this id"
        });
      }

      if (detailPost?.dataValues?.video) {
        this.deleteFileData(detailPost.dataValues.video, USER_VIDEO_PATH);
      }

      if (detailPost?.dataValues?.thumbnail) {
        this.deleteFileData(detailPost.dataValues.thumbnail, USER_THUMBNAIL_PATH);
      }

      const removePostData = await PostDbModel.destroy(
        {
          where: {
            id
          },
        }
      );

      return res.json({
        message: `Delete Post is successful.`,
        data: removePostData
      });
    } catch (e: any) {
      console.log("Delete Post API Error", e);
      return res.status(400).json({
        message: e.toString()
      });
    }
  }

  /**
   * add status video (for user's video like and view)
   * @param userLikeViewPostData 
   * @param res
   * @returns 
   */
  async addStatusVideo(userLikeViewPostData: any, res: any): Promise<any> {
    try {
      const video = await this.getPostById(userLikeViewPostData.postId);
      if (!video) {
        res.status(400).json({
          message: "User Post is not found by this id"
        });
      }

      const count = await UserLikeViewPostDbModel.count({
        where: {
          postId: userLikeViewPostData.postId,
          userId: parseInt(userLikeViewPostData.userId),
          status: userLikeViewPostData.status
        }
      });

      if (count > 0) {
        return res.json({
          message: `User already ${userLikeViewPostData.status} this video`,
        });
      }

      const createLikeViewVideo = await UserLikeViewPostDbModel.create({ ...userLikeViewPostData, createdAt: new Date().toISOString() });
      return res.json({
        message: `Add Vido ${userLikeViewPostData.status} Status is successful.`,
        data: createLikeViewVideo
      });
    } catch (e: any) {
      console.log(`------Add Video Status Error----`, e);
      return res.status(400).json({
        message: e.toString()
      });
    }
  }

  /**
   * remove video status.
   * @param userId 
   * @param postId 
   * @param status 
   * @param res 
   * @returns 
   */
  async removeStatusVideo(userId: any, postId: any, status: any, res: any): Promise<any> {
    try {
      const video = this.getPostById(postId);
      if (!video) {
        res.status(400).json({
          message: "Video is not found by this id"
        });
      }
      const removeLikeViewVideo = await UserLikeViewPostDbModel.destroy(
        {
          where: {
            userId,
            postId,
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
        message: e.toString()
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

      let limit = Number(req.query.size) || PAGINATION_LIMIT;
      let offset = Number(req.query.page) - 1 || 0;
      let page = offset * limit;
      let condition: any = {};
      if (userData?.dataValues?.interest > 0) {
        condition = {
          genre: userData.dataValues.interest
        }
      }
      const allVideoCount = await PostDbModel.count({
        include: [
          {
            model: UserDbModel,
            as: "createdByUser",
            where: condition
          }
        ]
      }) as any;

      const count = allVideoCount - (limit * (offset + 1));

      console.log('all Video count', allVideoCount);

      let postList = await this.getVideoForTop(limit, page, condition);
      console.log('postList', postList);
      if (allVideoCount < count) {
        limit = limit - postList.length;
        offset = (count - allVideoCount) / limit;
        const prePostId = postList?.dataValues?.map((data: any) => data.id);
        condition = {
          id: { $ne: prePostId }
        };
        let nextPostList = await this.getVideoForTop(limit, offset, condition);
        postList = [...postList, ...nextPostList];
      }

      // like and view count for video.
      if (postList?.length > 0) {
        for (let i = 0; i < postList.length; i++) {
          const likeCount = await UserLikeViewPostDbModel.count({
            where: {
              postId: postList[i].dataValues.id,
              status: 'like'
            }
          });
          postList[i].dataValues.likeCount = this.formatNumber(likeCount);

          const viewCount = await UserLikeViewPostDbModel.count({
            where: {
              postId: postList[i].dataValues.id,
              status: 'view'
            }
          });
          postList[i].dataValues.viewCount = this.formatNumber(viewCount);
        }
      }

      return res.json({
        data: postList,
        count: postList.length
      });
    } catch (e: any) {
      console.log('------Video List API Error----', e);
      return res.status(400).json({
        message: e.toString()
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
  async getVideoForTop(limit: any, offset: any, condition: any) {
    try {
      const postList = await PostDbModel.findAll({
        limit,
        offset,
        include: [
          {
            model: UserDbModel,
            as: "createdByUser",
            // where: { id },
            include: [
              {
                model: UserRoleDbModel,
                as: "user_role",
              }
            ]
          }
        ]
      }) as any;
      return postList;
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
      let limit = Number(req.query.size) || PAGINATION_LIMIT;
      let offset = Number(req.query.page) - 1 || 0;
      let page = (offset * limit) || 0;
      const postList = await PostDbModel.findAll({
        limit,
        offset: page,
        include: [
          {
            model: UserDbModel,
            as: "createdByUser"
          }
        ]
      }) as any;

      // like and view count for video.
      if (postList?.length > 0) {
        for (let i = 0; i < postList.length; i++) {
          const likeCount = await UserLikeViewPostDbModel.count({
            where: {
              postId: postList[i].dataValues.id,
              status: 'like'
            }
          });
          postList[i].dataValues.likeCount = this.formatNumber(likeCount);

          const viewCount = await UserLikeViewPostDbModel.count({
            where: {
              postId: postList[i].dataValues.id,
              status: 'view'
            }
          });
          postList[i].dataValues.viewCount = this.formatNumber(viewCount);
        }
      }

      return res.json({
        data: postList,
        count: postList.length
      });
    } catch (e: any) {
      console.log('------Video List API Error----', e);
      return res.status(400).json({
        message: e.toString()
      });
    }
  }

  async support(req: any, res: any): Promise<any> {
    try {
      const param = req.body;
      let productList = [
        {
          price_data: {
            currency: "EUR",
            product_data: {
              donatorId: param.userId,
              postId: param.id
            },
            unit_amount: param.amount,
          },
          // quantity: 1,
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
            userId: param.loginId,
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
}

export const postService = new PostService();