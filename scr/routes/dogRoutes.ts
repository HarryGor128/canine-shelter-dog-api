import Router from 'koa-router';
import dogControllers from '../controllers/dogControllers';

const dogRoutes = (router: Router<any, {}>) => {
    router.get('/dog/getAllDogsInfo', dogControllers.getAllDogsInfo);
    router.post('/dog/addNewDogInfo', dogControllers.addNewDogInfo);
    router.get('/dog/getDogInfo', dogControllers.getDogInfo);
    router.put('/dog/updateDogInfo', dogControllers.updateDogInfo);
    router.delete('/dog/deleteDogInfo', dogControllers.deleteDogInfo);
    router.post('/dog/uploadDogPhoto', dogControllers.uploadDogPhoto);
    router.get('/dog/getBreedsList', dogControllers.getBreedsList);
    router.get('/dog/getBreedImg', dogControllers.getBreedImg);
};

export default dogRoutes;
