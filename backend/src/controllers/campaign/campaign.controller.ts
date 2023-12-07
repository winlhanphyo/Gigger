import { Response, Request } from 'express';
import autobind from 'autobind-decorator';
import { campaignService } from '../../services/campaign';
import { ICampaignModel } from '../../database';
import { PAGINATION_LIMIT } from '../../utils/constant';
import { Op } from 'sequelize';

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
    
    let otherFindOptions: any = undefined;
    let condition: any = {};
    const title = req.query.title;
    const genre = req.query.genre;
    const highlight = req.query.highlight; // for role in UI
    const instrument = req.query.instrument;
    const role = req.query.role;
    const status = req.query.status; // for available

    title ? condition.title = {
      [Op.like]: `%${title}%`,
    } : null;
    genre ? condition.genre = genre : null;
    highlight ? condition.highlight = {
      [Op.like]: `%${highlight}%`,
    }
    : null;
    instrument ? condition.instrument = instrument : null;
    role ? condition.role = role : null;
    status ? condition.status = status : null;
    // when date and time
    // place
    // radius eg. 25km

    otherFindOptions = {
      where: condition
    };

    const response = await campaignService.getCampaignList(undefined, otherFindOptions, page, size, res);
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