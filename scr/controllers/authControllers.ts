import Application from 'koa';
import Router from 'koa-router';

const authControllers = {
    login: (
        ctx: Application.ParameterizedContext<
            any,
            Router.IRouterParamContext<any, {}>,
            any
        >,
    ) => {}, // Login with firebase
    registration: (
        ctx: Application.ParameterizedContext<
            any,
            Router.IRouterParamContext<any, {}>,
            any
        >,
    ) => {}, // Registration new account in firebase
};

export default authControllers;
