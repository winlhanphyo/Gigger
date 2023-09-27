"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignController = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const campaign_1 = require("../../services/campaign");
const constant_1 = require("../../utils/constant");
let CampaignController = class CampaignController {
    /**
     * get all campaign data.
     * @param req
     * @param res
     * @returns
     */
    getAllCampaign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let offset = Number(req.query.page) - 1 || 0;
            const size = Number(req.query.size) || constant_1.PAGINATION_LIMIT;
            let page = offset * size;
            const response = yield campaign_1.campaignService.getCampaignList(undefined, undefined, page, size, res);
            return response;
        });
    }
    /**
     * create Campaign.
     * @param req
     * @param res
     */
    createCampaign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield campaign_1.campaignService.createCampaign(req, res);
            return result;
        });
    }
    /**
     * update Campaign.
     * @param req
     * @param res
     * @returns
     */
    updateCampaign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateCampaignData = yield campaign_1.campaignService.updateCampaign(req, res);
            return updateCampaignData;
        });
    }
    /**
     * campaign Detail
     * @param req
     * @param res
     */
    detailCampaign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const campaignData = yield campaign_1.campaignService.getCampaignById(id, res);
            return campaignData;
        });
    }
    /**
     * delete campaign video.
     * @param req
     * @param res
     */
    deleteCampaign(req, res) {
        const data = campaign_1.campaignService.deleteCampaign(req, res);
        return data;
    }
};
CampaignController = __decorate([
    autobind_decorator_1.default
], CampaignController);
exports.campaignController = new CampaignController();
