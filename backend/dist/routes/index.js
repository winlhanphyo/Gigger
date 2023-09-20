"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const custom_router_1 = require("./custom-router");
const v1_1 = require("./v1");
const user_1 = require("./v1/user");
const post_1 = require("./v1/post");
const campaign_1 = require("./v1/campaign");
const v1ApiRoutes = new custom_router_1.Router();
const baseRouter = new custom_router_1.Router();
try {
    v1ApiRoutes.use('/events', v1_1.eventRouter);
    v1ApiRoutes.use('/users', user_1.userRouter);
    v1ApiRoutes.use('/posts', post_1.postRouter);
    v1ApiRoutes.use('/campaigns', campaign_1.campaignRouter);
    baseRouter.use('/api/v1', v1ApiRoutes);
}
catch (err) {
    throw err;
}
exports.router = baseRouter.toExpressRequestHandler();
