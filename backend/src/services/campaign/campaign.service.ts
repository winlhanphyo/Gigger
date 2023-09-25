import { FindOptions } from "sequelize";
import { ICampaignModel, CampaignDbModel, UserDbModel } from "../../database";
import { PAGINATION_LIMIT } from "../../utils/constant";
import { deleteFile } from "../../utils/utils";

class CampaignService {
  /**
   * get campaign list.
   * @param campaignAttributes 
   * @param otherFindOptions 
   * @returns 
   */
  async getCampaignList(campaignAttributes?: Array<any>, otherFindOptions?: FindOptions, offset?: number, limit?: number, res?: any): Promise<any> {
    try {
      limit = limit && limit > 0 ? limit : PAGINATION_LIMIT;
      let campaignList = await CampaignDbModel.findAll({
        ...otherFindOptions,
        attributes: campaignAttributes,
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

      return res.json({
        count: campaignList.length,
        data: campaignList
      });

    } catch (e: any) {
      console.log('------get campaign list API error----', e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * create campaign data.
   * @param campaignObj 
   * @returns 
   */
  async createCampaign(req: any, res: any): Promise<CampaignDbModel> {
    try {
      let image: string = req.body.image;
      if (req.files?.image?.length > 0) {
        image = req.files.image[0].path?.split("\\").join("/");
      }

      const campaignObj: ICampaignModel = {
        title: req.body.title,
        description: req.body.description,
        endDate: req.body.endDate,
        hashTags: req.body.hashTags,
        location: req.body.location,
        memberShipContent: req.body.memberShipContent,
        followerOnly: req.body.followerOnly,
        image,
        createdUser: req.headers['userid']
      } as any;

      const createCampaign = await CampaignDbModel.create({ ...campaignObj, createdAt: new Date().toISOString() });
      return res.json({
        message: 'Campaign is created successfully',
        data: createCampaign
      });
    } catch (e: any) {
      console.log("-----Create Campaign API error----", e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * update Campaign data.
   * @param req 
   * @param res 
   */
  async updateCampaign(req: any, res: any): Promise<any> {
    try {
      const id = +req.params.id;
      const detailCampaign = await campaignService.getCampaignById(id);

      if (!detailCampaign) {
        return res.status(404).send("Campaign is not found");
      }

      const campaignObj: ICampaignModel = {
        title: req.body.title,
        description: req.body.description,
        endDate: req.body.endDate,
        hashTags: req.body.hashTags,
        location: req.body.location,
        memberShipContent: req.body.memberShipContent,
        followerOnly: req.body.followerOnly,
        updatedUser: req.headers['userid'],
        updatedAt: new Date().toISOString()
      } as any;


      let image: any = req.body.image;
      if (req.files?.image?.length > 0) {
        image = req.files.image[0].path?.split("\\").join("/");
        if (detailCampaign.image) {
          deleteFile(detailCampaign.image);
        }
        if (detailCampaign) {
          campaignObj.image = image;
        }
      }

      const updateCampaignData = await CampaignDbModel.update(campaignObj, {
        where: { id: id as number }
      });
      return res.json({
        message: 'Campaign is updated successfully',
        data: updateCampaignData
      });
    } catch (e: any) {
      console.log('------update campaign error----', e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * get Campaign by Id.
   * @param campaign_id 
   * @returns 
   */
  async getCampaignById(campaign_id: number, res: any = null): Promise<any> {
    try {
      const campaignData = await CampaignDbModel.findOne({
        where: {
          id: campaign_id
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
      console.log('Campaign Data', campaignData);
      if (!campaignData) {
        return res.status(404).json({
          msg: "Campaign data is not found by this id"
        });
      }

      if (res) {
        return res.json({
          data: campaignData
        })
      } else {
        return campaignData;
      }

    } catch (e: any) {
      console.log("--Get Campaign By Id API Error---", e);
      if (res) {
        return res.status(400).json({
          msg: e.toString()
        });
      } else {
        return null;
      }
    }
  }

  /**
   * delete campaign.
   * @param req
   * @param res 
   * @returns 
   */
  async deleteCampaign(req: any, res: any): Promise<CampaignDbModel> {
    try {
      const id = req.params.id;
      const detailCampaign = await this.getCampaignById(id);
      if (!detailCampaign) {
        return res.status(400).json({
          msg: "Campaign is not found by this id"
        });
      }

      const removeCampaignData = await CampaignDbModel.destroy(
        {
          where: {
            id
          },
        }
      );

      return res.json({
        message: `Delete Campaign is successful.`,
        data: removeCampaignData
      });
    } catch (e: any) {
      console.log("Delete Campaign API Error", e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

}

export const campaignService = new CampaignService();