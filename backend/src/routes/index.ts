import { Router } from "./custom-router";
import { eventRouter  } from "./v1";
import { artistRouter } from "./v1/artist";

const v1ApiRoutes = new Router();

const baseRouter = new Router();

try {
  
  v1ApiRoutes.use('/events', eventRouter);
  v1ApiRoutes.use('/artists', artistRouter);

  baseRouter.use('/api/v1', v1ApiRoutes);

} catch (err) {
  throw err;
}

export const router = baseRouter.toExpressRequestHandler();
