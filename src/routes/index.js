import express from 'express';
const router = express.Router();

import userRoute from './user.route';
//import authRoute from './googleAuth.route';
import weatherRoute from './weather.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.use('/users', userRoute);
  //router.use('/auth', authRoute);
  router.use('/weatherData', weatherRoute);

  return router;
};

export default routes;
