import Koa from 'koa';
import firebaseServices from '../services/firebaseServices';

const dogControllers = {
    getAllDogsInfo: async (ctx: Koa.Context) => {
        const result = await firebaseServices.getCollection('dog');

        ctx.body = result ? result : [];
    }, // Get all dogs info
    addNewDogInfo: (ctx: Koa.Context) => {
        const newRecord: Dog = ctx.request.body;
        console.log('🚀 ~ file: dogControllers.ts:12 ~ newRecord:', newRecord);
    }, // Add new dog
    getDogInfo: async (ctx: Koa.Context) => {
        const { id } = ctx.query;
        const result = await firebaseServices.getDoc('dog', id as string);

        if (result) {
            ctx.body = result;
        } else {
            ctx.status = 404;
        }
    }, // Get dog info by id
    updateDogInfo: (ctx: Koa.Context) => {}, // Update dog info by id
    deleteDogInfo: (ctx: Koa.Context) => {}, // Delete dog info by id
};

export default dogControllers;
