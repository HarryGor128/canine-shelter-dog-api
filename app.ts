import Koa from 'koa';
import Router from 'koa-router';
import firebaseConnect from './scr/startup/firebaseConnect';

const koa = new Koa();
const router = new Router();

firebaseConnect();

koa.use(router.routes());
koa.listen(3003);
console.log('Debug link: http://localhost:3003/');
