import Koa from 'koa';
import request from 'supertest';

const testCase = (koa: Koa) => {
    describe('Dog endpoint testing', () => {
        test('Get all dog info', async () => {
            const result = await request(koa.callback()).get(
                '/dog/getAllDogsInfo',
            );
            expect(result.statusCode).toEqual(200);
        });
    });
};

export default testCase;
