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
        ctx.body = await firebaseServices.getCollection('dog');
    }, // Get all dogs info
    addNewDogInfo: (
        ctx: Application.ParameterizedContext<
            any,
            Router.IRouterParamContext<any, {}>,
            any
        >,
    ) => {}, // Add new dog
    getDogInfo: (
        ctx: Application.ParameterizedContext<
            any,
            Router.IRouterParamContext<any, {}>,
            any
        >,
    ) => {}, // Get dog info by id
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
