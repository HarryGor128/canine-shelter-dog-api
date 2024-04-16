import Koa from 'koa';
import firebaseServices from '../services/firebaseServices';
import Dog from '../types/Dog';
import objTypeChecking from '../utils/objTypeChecking';

const dogControllers = {
    // Get all dogs info
    getAllDogsInfo: async (ctx: Koa.Context) => {
        const result = await firebaseServices.getCollection('dog');

        ctx.body = result ? result : [];
    },

    // Add new dog
    addNewDogInfo: async (ctx: Koa.Context) => {
        const newRecord = ctx.request.body as Dog;

        if (objTypeChecking(newRecord, new Dog())) {
            ctx.status = 400;
        }

        const nextId = await firebaseServices.getNextId('dog', 'id');
        newRecord.id = nextId;
        console.log(
            '🚀 ~ file: dogControllers.ts:18 ~ addNewDogInfo: ~ newRecord:',
            newRecord,
        );

        const result = await firebaseServices.addDoc('dog', nextId, newRecord);

        if (result.result) {
            ctx.status = 200;
        } else {
            ctx.status = 500;
            ctx.message = result.msg;
        }
    },

    // Get dog info by id
    getDogInfo: async (ctx: Koa.Context) => {
        const { id } = ctx.query;
        const result = await firebaseServices.getDoc('dog', id as string);

        if (result) {
            ctx.body = result;
        } else {
            ctx.status = 404;
        }
    },

    // Update dog info by id
    updateDogInfo: async (ctx: Koa.Context) => {},

    // Delete dog info by id
    deleteDogInfo: async (ctx: Koa.Context) => {},
};

export default dogControllers;
