import Koa from 'koa';
import Router from 'koa-router';
import firebaseInitialize from './scr/startup/firebaseInitialize';

const koa = new Koa();
const router = new Router();

firebaseInitialize();

koa.use(router.routes());
koa.listen(3003);
console.log('Debug link: http://localhost:3003/');
