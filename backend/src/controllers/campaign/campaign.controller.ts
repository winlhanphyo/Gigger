import { Response, Request } from 'express';
import autobind from 'autobind-decorator';
import { campaignService } from '../../services/campaign';
import { ICampaignModel } from '../../database';
import { PAGINATION_LIMIT } from '../../utils/constant';

@autobind
class CampaignController {

  /**
   * get all campaign data.
   * @param req 
   * @param res 
   * @returns 
   */
  async getAllCampaign(req: Request, res: Response) {
    let offset = Number(req.query.page) - 1 || 0;
    const size = Number(req.query.size) || PAGINATION_LIMIT;
    let page = offset * size;
    const response = await campaignService.getCampaignList(undefined, undefined, page, size, res);
    return response;
  }

  /**
   * create Campaign.
   * @param req 
   * @param res 
   */
  async createCampaign(req: Request, res: Response) {
    const result = await campaignService.createCampaign(req, res);
    return result;
  }

  /**
   * update Campaign.
   * @param req 
   * @param res 
   * @returns 
   */
  async updateCampaign(req: Request, res: Response) {
    const updateCampaignData = await campaignService.updateCampaign(req, res);
    return updateCampaignData;
  }

  /**
   * campaign Detail
   * @param req 
   * @param res 
   */
  async detailCampaign(req: Request, res: Response) {
    const id = +req.params.id;
    const campaignData = await campaignService.getCampaignById(id, res);
    return campaignData;
  }

  /**
   * delete campaign video.
   * @param req 
   * @param res 
   */
  deleteCampaign(req: any, res: any) {
    const data = campaignService.deleteCampaign(req, res);
    return data;
  }

}

export const campaignController = new CampaignController();