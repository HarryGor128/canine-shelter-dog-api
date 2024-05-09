import Koa from 'koa';
import request from 'supertest';
import Login from '../../types/Login';
import Registration from '../../types/Registration';

const loginInfo: Login = {
    email: 'freeac@test.com',
    password: '123456',
};

const regInfo: Registration = {
    email: 'testreg@test.com',
    password: '123456',
    signUpCode: 'ILoveDog',
};

const authCase = (koa: Koa) => {
    describe('Auth endpoint testing', () => {
        test('Login', async () => {
            const result = await request(koa.callback())
                .post('/auth/login')
                .send(loginInfo);
            expect(result.statusCode).toEqual(200);
        });

        test('Registration', async () => {
            const result = await request(koa.callback())
                .post('/auth/registration')
                .send(regInfo);
            expect(result.statusCode).toEqual(200);
        });

        test('Account role query', async () => {
            const result = await request(koa.callback()).get(
                '/auth/roleQuery?email=harry99128@gmail.com',
            );
            expect(result.statusCode).toEqual(200);
        });
    });
};

export default authCase;
