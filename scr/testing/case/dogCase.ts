import Koa from 'koa';
import request from 'supertest';
import Dog from '../../types/Dog';
import UploadFile from '../../types/UploadFile';
import Login from '../../types/Login';

const getDateTime = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

const newDog: Dog = {
    id: 0,
    name: 'New dog',
    photo: 'https://firebasestorage.googleapis.com/v0/b/canine-shelter-dog-api.appspot.com/o/Dog%2Fimages.jpg?alt=media&token=1f0431eb-4656-4883-a197-84cc278d2c94',
    sex: 'F',
    description: 'Add new dog',
    dateOfBirth: 1713196800,
    breeds: 'akita',
};

const updateDog: Dog = {
    id: 3,
    name: 'Update dog',
    photo: 'https://firebasestorage.googleapis.com/v0/b/canine-shelter-dog-api.appspot.com/o/Dog%2Fimages.jpg?alt=media&token=1f0431eb-4656-4883-a197-84cc278d2c94',
    sex: 'F',
    description: 'Update dog info',
    dateOfBirth: 1713196800,
    breeds: 'akita',
};

const uploadFile: UploadFile = {
    fileName: `${getDateTime()}.jpg`,
    base64: 'data:image/jpeg;base64,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',
};

const loginInfo: Login = {
    email: 'freeac@test.com',
    password: '123456',
};

const dogCase = (koa: Koa) => {
    describe('Dog endpoint testing', () => {
        test('Login', async () => {
            const result = await request(koa.callback())
                .post('/auth/login')
                .send(loginInfo);
            expect(result.statusCode).toEqual(200);
        });

        test('Get all dog info', async () => {
            const result = await request(koa.callback()).get(
                '/dog/getAllDogsInfo',
            );
            expect(result.statusCode).toEqual(200);
        });

        test('Get list of dog info by list of id', async () => {
            const result = await request(koa.callback()).get(
                '/dog/getDogWithList?id=[0]',
            );
            expect(result.statusCode).toEqual(200);
        });

        test('Get a dog info by id', async () => {
            const result = await request(koa.callback()).get(
                '/dog/getDogInfo?id=0',
            );
            expect(result.statusCode).toEqual(200);
        });

        test('Get dog breeds list', async () => {
            const result = await request(koa.callback()).get(
                '/dog/getBreedsList',
            );
            expect(result.statusCode).toEqual(200);
        });

        test('Get dog breeds image', async () => {
            const result = await request(koa.callback()).get(
                '/dog/getBreedImg?breed=greyhound',
            );
            expect(result.statusCode).toEqual(200);
        });

        test('Add new dog info', async () => {
            const result = await request(koa.callback())
                .post('/dog/addNewDogInfo')
                .send(newDog);
            expect(result.statusCode).toEqual(201);
        });

        test('Update dog info', async () => {
            const result = await request(koa.callback())
                .put('/dog/updateDogInfo')
                .send(updateDog);
            expect(result.statusCode).toEqual(200);
        });

        test('Delete dog info', async () => {
            const result = await request(koa.callback()).delete(
                '/dog/deleteDogInfo?id=3',
            );
            expect(result.statusCode).toEqual(200);
        });

        test('Upload dog photo', async () => {
            const result = await request(koa.callback())
                .post('/dog/uploadDogPhoto')
                .send(uploadFile);
            expect(result.statusCode).toEqual(201);
        });
    });
};

export default dogCase;
