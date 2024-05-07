import Koa from 'koa';
import firebaseServices, { fireStoreRes } from '../services/firebaseServices';
import ChatMessage from '../types/ChatMessage';
import objTypeChecking from '../utils/objTypeChecking';
import UploadFile from '../types/UploadFile';

const chatControllers = {
    // Get all chat history
    getChatAllHistory: async (ctx: Koa.Context) => {
        const result = await firebaseServices.getCollection('chat');
        console.log(
            '🚀 ~ file: chatControllers.ts:6 ~ getChatAllHistory: ~ result:',
            result,
        );

        ctx.body = result ? result : [];
        if (result.length === 0) {
            ctx.status = 404;
        }
    },

    // Add message to chat room
    addMessage: async (ctx: Koa.Context) => {
        const newRecord = ctx.request.body as ChatMessage;

        if (!objTypeChecking(newRecord, new ChatMessage())) {
            ctx.status = 400;
            return;
        }

        if (
            !newRecord.email ||
            !newRecord.msg ||
            !newRecord.type ||
            newRecord.createTime < 0 ||
            newRecord.lastUpdate < 0
        ) {
            ctx.status = 400;
            return;
        }

        const nextId = await firebaseServices.getNextId('chat', 'id');
        newRecord.id = nextId;
        console.log(
            '🚀 ~ file: chatControllers.ts:42 ~ addMessage: ~ nextId:',
            nextId,
        );

        const result = await firebaseServices.addDoc('chat', nextId, newRecord);

        if (result.result) {
            ctx.status = 201;
        } else {
            ctx.status = 500;
            ctx.message = result.msg;
        }
    },

    // Update existing message in chat room
    updateMessage: async (ctx: Koa.Context) => {
        const updateRecord = ctx.request.body as ChatMessage;

        if (!objTypeChecking(updateRecord, new ChatMessage())) {
            ctx.status = 400;
            return;
        }

        if (
            !updateRecord.email ||
            !updateRecord.msg ||
            !updateRecord.type ||
            updateRecord.createTime < 0 ||
            updateRecord.lastUpdate < 0
        ) {
            ctx.status = 400;
            return;
        }

        const result = await firebaseServices.addDoc(
            'dog',
            updateRecord.id,
            updateRecord,
        );
        console.log(
            '🚀 ~ file: chatControllers.ts:83 ~ updateMessage: ~ result:',
            result,
        );

        if (result.result) {
            ctx.status = 200;
        } else {
            ctx.status = 500;
            ctx.message = result.msg;
        }
    },

    // Delete existing message in chat room
    deleteMessage: async (ctx: Koa.Context) => {
        const { id } = ctx.query;

        const deleteRecord = await firebaseServices.getDoc('dog', id as string);

        const result = await firebaseServices.deleteDoc('dog', id as string);
        console.log('🚀 ~ deleteDogInfo: ~ result:', result);

        if (result.result) {
            const deletePhotoResult: fireStoreRes =
                (deleteRecord as ChatMessage).type === 'img'
                    ? { result: true, msg: '' }
                    : await firebaseServices.deleteFileByURL(
                          'Chat',
                          (deleteRecord as ChatMessage).msg,
                      );

            if (deletePhotoResult.result) {
                ctx.status = 200;
            } else {
                ctx.status = 500;
                ctx.message = deletePhotoResult.msg;
            }
        } else {
            ctx.status = 500;
            ctx.message = result.msg;
        }
    },

    // Upload image to chat room
    uploadImage: async (ctx: Koa.Context) => {
        const uploadFile = ctx.request.body as UploadFile;

        if (!objTypeChecking(uploadFile, new UploadFile())) {
            ctx.status = 400;
            return;
        }

        if (!uploadFile.base64 || !uploadFile.fileName) {
            ctx.status = 400;
            return;
        }

        const result = await firebaseServices.uploadBase64(
            'Chat',
            uploadFile.fileName,
            uploadFile.base64,
        );
        console.log(
            '🚀 ~ file: chatControllers.ts:144 ~ uploadImage: ~ result:',
            result,
        );

        if (result.result) {
            ctx.status = 201;
            ctx.body = result.msg;
        } else {
            ctx.status = 500;
            ctx.message = result.msg;
        }
    },
};

export default chatControllers;
