import { Router } from "./custom-router";

import { interestRouter  } from "./v1";

const v1ApiRoutes = new Router();

const baseRouter = new Router();

try {
  
  v1ApiRoutes.use('/interests', interestRouter);

  baseRouter.use('/api/v1', v1ApiRoutes);

} catch (err) {
  throw err;
}

export const router = baseRouter.toExpressRequestHandler();



