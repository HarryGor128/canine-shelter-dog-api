import Router from 'koa-router';
import favoritesControllers from '../controllers/favoritesControllers';

const favoritesRoutes = (router: Router<any, {}>) => {
    router.get(
        '/favorites/getUserFavoritesList',
        favoritesControllers.getUserFavoritesList,
    );
    router.post('/favorites/addFavorite', favoritesControllers.addFavorite);
    router.delete(
        '/favorites/deleteFavorite',
        favoritesControllers.deleteFavorite,
    );
};

export default favoritesRoutes;
