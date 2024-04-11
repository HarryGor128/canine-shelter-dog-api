import Router from 'koa-router';

const helloWorld = (router: Router<any, {}>) => {
    router.get('/', async (ctx) => {
        ctx.body = 'Hello world';
    });
};

export default helloWorld;
