import { Router } from "../../custom-router";
import { campaignController } from "../../../controllers/campaign";

const router = new Router();

router.get('/', campaignController.getAllCampaign);
router.post('/', campaignController.createCampaign);
router.get('/:id', campaignController.detailCampaign);
router.post('/update/:id', campaignController.updateCampaign);
router.delete('/:id', campaignController.deleteCampaign);

export const campaignRouter = router;
