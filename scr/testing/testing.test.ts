import envLoader from '../utils/envLoader';
envLoader();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import dogRoutes from '../routes/dogRoutes';
import authRoutes from '../routes/authRoutes';
import favoritesRoutes from '../routes/favoritesRoutes';
import request from 'supertest';

const koa = new Koa();
const router = new Router();

// Add Router Here
dogRoutes(router);
authRoutes(router);
favoritesRoutes(router);

koa.use(bodyParser());
koa.use(cors());
koa.use(router.routes());

koa.listen(5000);

describe('Dog endpoint testing', () => {
    test('Get all dog info', async () => {
        const result = await request(koa.callback()).get('/dog/getAllDogsInfo');
        expect(result.statusCode).toEqual(200);
    });
});
