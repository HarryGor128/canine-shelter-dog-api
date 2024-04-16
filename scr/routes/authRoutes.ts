import Router from 'koa-router';
import authControllers from '../controllers/authControllers';

const authRoutes = (router: Router<any, {}>) => {
    router.post('/auth/login', authControllers.login);
    router.post('/auth/registration', authControllers.registration);
};

export default authRoutes;
