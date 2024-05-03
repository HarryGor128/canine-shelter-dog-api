import envLoader from './scr/utils/envLoader';
envLoader();

import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import dogRoutes from './scr/routes/dogRoutes';
import authRoutes from './scr/routes/authRoutes';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import serve from 'koa-static';

const koa = new Koa();
const router = new Router();

// Add Router Here
dogRoutes(router);
authRoutes(router);

koa.use(serve('./docs'));
koa.use(bodyParser());
koa.use(cors());
koa.use(router.routes());
koa.use(logger());
koa.listen(process.env.PORT);
console.log(`Docs: http://localhost:${process.env.PORT}/index.html`);
