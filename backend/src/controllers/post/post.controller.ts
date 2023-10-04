import { Response, Request } from 'express';
import autobind from 'autobind-decorator';
import { postService } from '../../services/post';
import { IPostModel } from '../../database';
import { PAGINATION_LIMIT } from '../../utils/constant';

@autobind
class PostController {
  /**
   * get all posts data.
   * @param req 
   * @param res 
   * @returns 
   */
  async getAllPost(req: Request, res: Response) {
    let offset = Number(req.query.page) - 1 || 0;
    const size = Number(req.query.size) || PAGINATION_LIMIT;
    let page = offset * size;
    const response = await postService.getPostList(undefined, undefined, page, size, res);
    return response;
  }

  /**
   * create Post.
   * @param req 
   * @param res 
   */
  async createPost(req: Request, res: Response) {
    const result = await postService.createPost(req, res);
    return result;
  }

  /**
   * update Post.
   * @param req 
   * @param res 
   * @returns 
   */
  async updatePost(req: Request, res: Response) {
    const updatePostData = await postService.updatePost(req, res);
    return updatePostData;
  }

  /**
   * post Detail
   * @param req 
   * @param res 
   */
  async detailPost(req: Request, res: Response) {
    const id = +req.params.id;
    const postData = await postService.getPostById(id, res);
    return postData;
  }

  /**
 * delete post video.
 * @param req 
 * @param res 
 */
  deletePost(req: any, res: any) {
    const data = postService.deletePost(req, res);
    return data;
  }

  /**
 * user video list for home page.
 * @param req 
 * @param res 
 */
  userTopVideoList(req: any, res: Response) {
    const video = postService.topVideoList(req, res);
    return video;
  }

  /**
   * random top video list.
   * @param req 
   * @param res 
   */
  userRandomTopVideoList(req: any, res: Response) {
    const video = postService.randomTopVideoList(req, res);
    return video;
  }

  /**
   * user video list.
   * @param req 
   * @param res 
   */
  userVideoList(req: any, res: Response) {
    const video = postService.videoList(req, res);
    return video;
  }

  async getVideoWithUserId(req: Request, res: Response) {
    const videoList = await postService.getVideoWithUserId(req, res);
    return videoList;
  }

  /**
   * get all events data.
   * @param req 
   * @param res 
   * @returns 
   */
  async likeVideo(req: Request, res: Response) {
    const userVideoData = {
      userId: req.headers['userid'],
      postId: req.params.id,
      status: "like"
    };
    const response = await postService.addStatusVideo(userVideoData, res);
    return response;
  }

  /**
   * view Video.
   * @param req 
   * @param res 
   */
  async viewVideo(req: Request, res: Response) {
    const userVideoData = {
      userId: req.headers['userid'],
      postId: req.params.id,
      status: "view"
    };
    const response = await postService.addStatusVideo(userVideoData, res);
    return response;
  }

  /**
   * unlike Video.
   * @param req 
   * @param res 
   * @returns 
   */
  async unLikeVideo(req: Request, res: Response) {
    const postId = req.params.id;
    const userId = req.headers['userid'];
    const response = await postService.removeStatusVideo(userId, postId, "like", res);
    return response;
  }

  async support(req: any, res: Response): Promise<any> {
    const response = await postService.support(req, res);
    return response;
  }

}

export const postController = new PostController();