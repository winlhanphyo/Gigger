import { Router } from "./custom-router";
import { eventRouter  } from "./v1";
import { artistRouter } from "./v1/artist";
import { userRouter } from "./v1/user";
import { postRouter } from "./v1/post";
import { campaignRouter } from "./v1/campaign";

const v1ApiRoutes = new Router();

const baseRouter = new Router();

try {
  
  v1ApiRoutes.use('/events', eventRouter);
  v1ApiRoutes.use('/artists', artistRouter);
  v1ApiRoutes.use('/users', userRouter);
  v1ApiRoutes.use('/posts', postRouter);
  v1ApiRoutes.use('/campaigns', campaignRouter);

  baseRouter.use('/api/v1', v1ApiRoutes);

} catch (err) {
  throw err;
}

export const router = baseRouter.toExpressRequestHandler();
