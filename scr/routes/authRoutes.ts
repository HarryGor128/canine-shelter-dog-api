import Router from 'koa-router';
import authControllers from '../controllers/authControllers';

const authRoutes = (router: Router<any, {}>) => {
    router.post('/login', authControllers.login);
    router.post('/registration', authControllers.registration);
};

export default authRoutes;
