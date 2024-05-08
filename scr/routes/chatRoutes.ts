import Router from 'koa-router';
import chatControllers from '../controllers/chatControllers';

const chatRoutes = (router: Router<any, {}>) => {
    router.get('/chat/getChatAllHistory', chatControllers.getChatAllHistory);
    router.post('/chat/addMessage', chatControllers.addMessage);
    router.put('/chat/updateMessage', chatControllers.updateMessage);
    router.del('/chat/deleteMessage', chatControllers.deleteMessage);
    router.post('/chat/uploadImage', chatControllers.uploadImage);
};

export default chatRoutes;
