import Koa from 'koa';
import Router from 'koa-router';
import helloWorld from './scr/helloWorld';

const koa = new Koa();
const router = new Router();

helloWorld(router);

koa.use(router.routes());
koa.listen(3003);
console.log('Debug link: http://localhost:3003/');
