import Koa from 'koa';
import request from 'supertest';
import Favorite from '../../types/Favorite';
import Login from '../../types/Login';

const favorite: Favorite = {
    id: 0,
    email: 'freeac@test.com',
};

const loginInfo: Login = {
    email: 'freeac@test.com',
    password: '123456',
};

const favoritesCase = (koa: Koa) => {
    describe('Favorites endpoint testing', () => {
        test('Login', async () => {
            const result = await request(koa.callback())
                .post('/auth/login')
                .send(loginInfo);
            expect(result.statusCode).toEqual(200);
        });

        test('Add a dog to favorites list by user email', async () => {
            const result = await request(koa.callback())
                .post('/favorites/addFavorite')
                .send(favorite);
            expect(result.statusCode).toEqual(201);
        });

        test('Get favorites list by user email', async () => {
            const result = await request(koa.callback()).get(
                '/favorites/getUserFavoritesList?email=freeac@test.com',
            );
            expect(result.statusCode).toEqual(200);
        });

        test('Delete dog from favorites list by user email', async () => {
            const result = await request(koa.callback()).delete(
                '/favorites/deleteFavorite?id=0&email=freeac@test.com',
            );
            expect(result.statusCode).toEqual(200);
        });
    });
};

export default favoritesCase;
