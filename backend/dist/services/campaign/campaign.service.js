"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignService = void 0;
const database_1 = require("../../database");
const constant_1 = require("../../utils/constant");
class CampaignService {
    /**
     * get campaign list.
     * @param campaignAttributes
     * @param otherFindOptions
     * @returns
     */
    getCampaignList(campaignAttributes, otherFindOptions, offset, limit, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                limit = limit && limit > 0 ? limit : constant_1.PAGINATION_LIMIT;
                let campaignList = yield database_1.CampaignDbModel.findAll(Object.assign(Object.assign({}, otherFindOptions), { attributes: campaignAttributes, limit,
                    offset, include: [
                        {
                            model: database_1.UserDbModel,
                            as: "createdByUser"
                        },
                        {
                            model: database_1.UserDbModel,
                            as: "updatedByUser"
                        }
                    ] }));
                return res.json({
                    count: campaignList.length,
                    data: campaignList
                });
            }
            catch (e) {
                console.log('------get campaign list API error----', e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * create campaign data.
     * @param campaignObj
     * @returns
     */
    createCampaign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const campaignObj = {
                    title: req.body.title,
                    description: req.body.description,
                    endDate: req.body.endDate,
                    hashTags: req.body.hashTags,
                    location: req.body.location,
                    memberShipContent: req.body.memberShipContent,
                    followerOnly: req.body.followerOnly,
                    createdUser: req.headers['userid']
                };
                const createCampaign = yield database_1.CampaignDbModel.create(Object.assign(Object.assign({}, campaignObj), { createdAt: new Date().toISOString() }));
                return res.json({
                    message: 'Campaign is created successfully',
                    data: createCampaign
                });
            }
            catch (e) {
                console.log("-----Create Campaign API error----", e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * update Campaign data.
     * @param req
     * @param res
     */
    updateCampaign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const detailCampaign = yield exports.campaignService.getCampaignById(id);
                if (!detailCampaign) {
                    return res.status(404).send("Campaign is not found");
                }
                const campaignObj = {
                    title: req.body.title,
                    description: req.body.description,
                    endDate: req.body.endDate,
                    hashTags: req.body.hashTags,
                    location: req.body.location,
                    memberShipContent: req.body.memberShipContent,
                    followerOnly: req.body.followerOnly,
                    updatedUser: req.headers['userid'],
                    updatedAt: new Date().toISOString()
                };
                const updateCampaignData = yield database_1.CampaignDbModel.update(campaignObj, {
                    where: { id: id }
                });
                return res.json({
                    message: 'Campaign is updated successfully',
                    data: updateCampaignData
                });
            }
            catch (e) {
                console.log('------update campaign error----', e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * get Campaign by Id.
     * @param campaign_id
     * @returns
     */
    getCampaignById(campaign_id, res = null) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const campaignData = yield database_1.CampaignDbModel.findOne({
                    where: {
                        id: campaign_id
                    },
                    include: [
                        {
                            model: database_1.UserDbModel,
                            as: "createdByUser"
                        },
                        {
                            model: database_1.UserDbModel,
                            as: "updatedByUser"
                        }
                    ]
                });
                console.log('Campaign Data', campaignData);
                if (!campaignData) {
                    return res.status(404).json({
                        msg: "Campaign data is not found by this id"
                    });
                }
                if (res) {
                    return res.json({
                        data: campaignData
                    });
                }
                else {
                    return campaignData;
                }
            }
            catch (e) {
                console.log("--Get Campaign By Id API Error---", e);
                if (res) {
                    return res.status(400).json({
                        msg: e.toString()
                    });
                }
                else {
                    return null;
                }
            }
        });
    }
    /**
     * delete campaign.
     * @param req
     * @param res
     * @returns
     */
    deleteCampaign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const detailCampaign = yield this.getCampaignById(id);
                if (!detailCampaign) {
                    return res.status(400).json({
                        msg: "Campaign is not found by this id"
                    });
                }
                const removeCampaignData = yield database_1.CampaignDbModel.destroy({
                    where: {
                        id
                    },
                });
                return res.json({
                    message: `Delete Campaign is successful.`,
                    data: removeCampaignData
                });
            }
            catch (e) {
                console.log("Delete Campaign API Error", e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
}
exports.campaignService = new CampaignService();
