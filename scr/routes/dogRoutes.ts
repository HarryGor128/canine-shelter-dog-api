import Router from 'koa-router';
import dogControllers from '../controllers/dogControllers';

const dogRoutes = (router: Router<any, {}>) => {
    router.get('/getAllDogsInfo', dogControllers.getAllDogsInfo);
    router.post('/addNewDogInfo', dogControllers.addNewDogInfo);
    router.get('/getDogInfo/:id', dogControllers.getDogInfo);
    router.put('/updateDogInfo/:id', dogControllers.updateDogInfo);
    router.delete('/deleteDogInfo/:id', dogControllers.deleteDogInfo);
};

export default dogRoutes;
