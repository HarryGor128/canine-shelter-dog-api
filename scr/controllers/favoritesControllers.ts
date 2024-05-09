import Koa from 'koa';
import firebaseServices from '../services/firebaseServices';
import objTypeChecking from '../utils/objTypeChecking';
import Favorite from '../types/Favorite';
import favoritesServices from '../services/favoritesServices';

const favoritesControllers = {
    // Get favorites list by user email
    getUserFavoritesList: async (ctx: Koa.Context) => {
        const { email } = ctx.query;

        const result = await favoritesServices.getFavoritesListByEmail(
            email as string,
        );

        ctx.body = result ? result : [];
        if (result.length === 0) {
            ctx.status = 404;
        }
    },

    // Add favorite dog to favorite list by user
    addFavorite: async (ctx: Koa.Context) => {
        const newRecord = ctx.request.body as Favorite;

        if (!objTypeChecking(newRecord, new Favorite())) {
            ctx.status = 400;
            return;
        }

        if (newRecord.id < 0 || !newRecord.email) {
            ctx.status = 400;
            return;
        }

        let idList = await favoritesServices.getFavoritesListByEmail(
            newRecord.email,
        );

        idList = idList.filter((item) => item !== newRecord.id);
        idList.push(newRecord.id);

        const result = await firebaseServices.addDoc(
            'favorites',
            newRecord.email,
            { id: idList },
        );

        if (result.result) {
            ctx.status = 201;
        } else {
            ctx.status = 500;
            ctx.message = result.msg;
        }
    },

    // Delete favorite dog to favorite list by user
    deleteFavorite: async (ctx: Koa.Context) => {
        const { email, id } = ctx.query;

        const delEmail = email as string;
        const delId = Number.parseInt(id as string);

        if (delId < 0 || !delEmail) {
            ctx.status = 400;
            return;
        }

        let idList = await favoritesServices.getFavoritesListByEmail(
            email as string,
        );

        idList = idList.filter((item) => item !== delId);

        const result = await firebaseServices.addDoc('favorites', delEmail, {
            id: idList,
        });

        if (result.result) {
            ctx.status = 200;
        } else {
            ctx.status = 500;
            ctx.message = result.msg;
        }
    },
};

export default favoritesControllers;
