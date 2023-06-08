import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';
import database from './config/database';
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';
import morgan from 'morgan';

const app = express();
const host = process.env.APP_HOST;
const port = process.env.APP_PORT || 3000;
const api_version = process.env.API_VERSION;

app.use(cors());
app.use(
  helmet({
    xssFilter: true
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: logStream }));

database();

import ratelimit from 'express-rate-limit';
const requestIp = require('request-ip');
const limiter = ratelimit({
  Window: 15 * 60 * 1000,
  max: 12,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  keyGenerator: (req) => {
    return requestIp.getClientIp(req);
  }
});
app.use(requestIp.mw());
app.use(limiter);

const requestCounter = require('./middlewares/request.middleware');
app.use(requestCounter());

app.use(`/api/${api_version}`, routes());
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/api/${api_version}/`);
});

export default app;
