import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import serve from 'koa-static';
import logger from 'koa-logger';
import dogRoutes from './routes/dogRoutes';
import authRoutes from './routes/authRoutes';
import favoritesRoutes from './routes/favoritesRoutes';
import chatRoutes from './routes/chatRoutes';
import testCase from './testing/testCase';

const apiServices = (port?: number) => {
    const koa = new Koa();
    const router = new Router();

    // Add Router Here
    dogRoutes(router);
    authRoutes(router);
    favoritesRoutes(router);
    chatRoutes(router);

    koa.use(serve('./docs'));
    koa.use(bodyParser());
    koa.use(cors());
    koa.use(router.routes());
    koa.use(logger());
    koa.listen(port ? port : process.env.PORT);
    console.log(
        `Docs: http://localhost:${port ? port : process.env.PORT}/index.html`,
    );

    if (port) {
        testCase(koa);
    }
};

export default apiServices;
