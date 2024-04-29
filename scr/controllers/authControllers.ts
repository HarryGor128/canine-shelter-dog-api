import Koa from 'koa';
import Registration from '../types/Registration';
import objTypeChecking from '../utils/objTypeChecking';
import firebaseServices from '../services/firebaseServices';
import Login from '../types/Login';

const authControllers = {
    // Login with firebase
    login: async (ctx: Koa.Context) => {
        const loginInfo = ctx.request.body as Login;

        // Missing field
        if (!objTypeChecking(loginInfo, new Login())) {
            ctx.status = 400;
            return;
        }

        if (!loginInfo.email || !loginInfo.password) {
            ctx.status = 400;
            ctx.message = 'Please enter email or password';
            return;
        }

        const result = await firebaseServices.loginEmail(
            loginInfo.email,
            loginInfo.password,
        );

        if (result.result) {
            ctx.status = 200;
            ctx.response.body = result.userCredential;
        } else {
            ctx.status = 500;
            ctx.message = result.msg;
        }
    },

    // Registration new account in firebase
    registration: async (ctx: Koa.Context) => {
        const regInfo = ctx.request.body as Registration;

        const goReg = async () => {
            const result = await firebaseServices.registration(
                regInfo.email,
                regInfo.password,
            );

            if (result.result) {
                ctx.status = 200;
                ctx.response.body = result.userCredential;
            } else {
                ctx.status = 500;
                ctx.message = result.msg;
            }

            return;
        };

        // Missing Field
        if (!objTypeChecking(regInfo, new Registration())) {
            ctx.status = 400;
            return;
        }

        if (!regInfo.email || !regInfo.password) {
            ctx.status = 400;
            ctx.message = 'Please enter email or password';
            return;
        }

        // Wrong sing up code
        if (regInfo.signUpCode !== '') {
            if (regInfo.signUpCode === 'ILoveDog') {
                const addResult = await firebaseServices.addDoc(
                    'staff',
                    regInfo.email,
                    { email: regInfo.email },
                );

                if (addResult.result) {
                    await goReg();
                } else {
                    ctx.status = 500;
                    ctx.message = addResult.msg;
                }
                return;
            }
            ctx.status = 400;
            ctx.message = 'Wrong sing up code';
            return;
        }

        await goReg();
    },

    // Query account role
    roleQuery: async (ctx: Koa.Context) => {
        const { email } = ctx.query;
        const result = await firebaseServices.getDoc('staff', email as string);
        if (result) {
            ctx.status = 200;
            ctx.response.body = result;
        }
    },
};

export default authControllers;
