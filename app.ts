import Koa from 'koa';
import Router from 'koa-router';

const koa = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello world';
});

koa.use(router.routes());
koa.listen(3003);
console.log('Debug link: http://localhost:3003/');
