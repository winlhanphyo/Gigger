import { Router } from "./custom-router";
import { eventRouter  } from "./v1";

const v1ApiRoutes = new Router();

const baseRouter = new Router();

try {
  
  v1ApiRoutes.use('/events', eventRouter);

  baseRouter.use('/api/v1', v1ApiRoutes);

} catch (err) {
  throw err;
}

export const router = baseRouter.toExpressRequestHandler();
