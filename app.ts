import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import dogRoutes from './scr/routes/dogRoutes';
import authRoutes from './scr/routes/authRoutes';

const koa = new Koa();
const router = new Router();

// Initialize API
// firebaseInitialize();

// Add Router Here
dogRoutes(router);
authRoutes(router);

koa.use(router.routes());
koa.use(logger());
koa.listen(3003);
console.log('Debug link: http://localhost:3003/');
