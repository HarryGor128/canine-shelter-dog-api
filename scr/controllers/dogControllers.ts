import Application from 'koa';
import Router from 'koa-router';
import firebaseServices from '../services/firebaseServices';

const dogControllers = {
    getAllDogsInfo: async (
        ctx: Application.ParameterizedContext<
            any,
            Router.IRouterParamContext<any, {}>,
            any
        >,
    ) => {
        const result = await firebaseServices.getCollection('dog');

        ctx.body = result ? result : [];
    }, // Get all dogs info
    addNewDogInfo: (
        ctx: Application.ParameterizedContext<
            any,
            Router.IRouterParamContext<any, {}>,
            any
        >,
    ) => {}, // Add new dog
    getDogInfo: async (
        ctx: Application.ParameterizedContext<
            any,
            Router.IRouterParamContext<any, {}>,
            any
        >,
    ) => {
        const result = await firebaseServices.getDoc('dog', ctx.params.id);

        if (result) {
            ctx.body = result;
        } else {
            ctx.status = 404;
        }
    }, // Get dog info by id
    updateDogInfo: (
        ctx: Application.ParameterizedContext<
            any,
            Router.IRouterParamContext<any, {}>,
            any
        >,
    ) => {}, // Update dog info by id
    deleteDogInfo: (
        ctx: Application.ParameterizedContext<
            any,
            Router.IRouterParamContext<any, {}>,
            any
        >,
    ) => {}, // Delete dog info by id
};

export default dogControllers;
