import envLoader from './scr/utils/envLoader';
envLoader();

import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import dogRoutes from './scr/routes/dogRoutes';
import authRoutes from './scr/routes/authRoutes';
import bodyParser from 'koa-bodyparser';

const koa = new Koa();
const router = new Router();

// Add Router Here
dogRoutes(router);
authRoutes(router);

koa.use(bodyParser());
koa.use(router.routes());
koa.use(logger());
koa.listen(443);
// console.log('Debug link: http://localhost:3003/');
