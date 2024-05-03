import Koa from 'koa';
import firebaseServices from '../services/firebaseServices';
import Dog from '../types/Dog';
import objTypeChecking from '../utils/objTypeChecking';
import UploadFile from '../types/UploadFile';

const dogControllers = {
    // Get all dogs info
    getAllDogsInfo: async (ctx: Koa.Context) => {
        const result = await firebaseServices.getCollection('dog');
        console.log('🚀 ~ getAllDogsInfo: ~ result:', result);

        ctx.body = result ? result : [];
        if (result.length === 0) {
            ctx.status = 404;
        }
    },

    // Add new dog
    addNewDogInfo: async (ctx: Koa.Context) => {
        const newRecord = ctx.request.body as Dog;

        if (!objTypeChecking(newRecord, new Dog())) {
            ctx.status = 400;
            return;
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
        console.log('🚀 ~ getDogInfo: ~ result:', result);

        if (result) {
            ctx.body = result;
        } else {
            ctx.status = 404;
        }
    },

    // Update dog info by id
    updateDogInfo: async (ctx: Koa.Context) => {
        const updateRecord = ctx.request.body as Dog;

        if (!objTypeChecking(updateRecord, new Dog())) {
            ctx.status = 400;
            return;
        }

        const result = await firebaseServices.addDoc(
            'dog',
            updateRecord.id,
            updateRecord,
        );
        console.log('🚀 ~ updateDogInfo: ~ result:', result);

        if (result.result) {
            ctx.status = 200;
        } else {
            ctx.status = 500;
            ctx.message = result.msg;
        }
    },

    // Delete dog info by id
    deleteDogInfo: async (ctx: Koa.Context) => {
        const { id } = ctx.query;

        const result = await firebaseServices.deleteDoc('dog', id as string);
        console.log('🚀 ~ deleteDogInfo: ~ result:', result);

        if (result.result) {
            ctx.status = 200;
        } else {
            ctx.status = 500;
            ctx.message = result.msg;
        }
    },

    uploadDogPhoto: async (ctx: Koa.Context) => {
        const uploadFile = ctx.request.body as UploadFile;

        if (!objTypeChecking(uploadFile, new UploadFile())) {
            ctx.status = 400;
            return;
        }

        const result = await firebaseServices.uploadBase64(
            'Dog/',
            uploadFile.fileName,
            uploadFile.base64,
        );
        console.log('🚀 ~ uploadDogPhoto: ~ result:', result);

        if (result.result) {
            ctx.status = 200;
            ctx.body = result.msg;
        } else {
            ctx.status = 500;
            ctx.message = result.msg;
        }
    },
};

export default dogControllers;
