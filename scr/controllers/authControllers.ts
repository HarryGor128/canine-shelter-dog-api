import Koa from 'koa';

const authControllers = {
    login: (ctx: Koa.Context) => {}, // Login with firebase
    registration: (ctx: Koa.Context) => {}, // Registration new account in firebase
};

export default authControllers;
