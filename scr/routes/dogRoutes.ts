import Router from 'koa-router';
import dogControllers from '../controllers/dogControllers';

const dogRoutes = (router: Router<any, {}>) => {
    router.get('/dog/getAllDogsInfo', dogControllers.getAllDogsInfo);
    router.post('/dog/addNewDogInfo', dogControllers.addNewDogInfo);
    router.get('/dog/getDogInfo', dogControllers.getDogInfo);
    router.put('/dog/updateDogInfo', dogControllers.updateDogInfo);
    router.delete('/dog/deleteDogInfo', dogControllers.deleteDogInfo);
};

export default dogRoutes;
