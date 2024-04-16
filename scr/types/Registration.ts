import Login from './Login';

class Registration extends Login {
    signUpCode: string;

    constructor() {
        super();
        this.signUpCode = '';
    }
}

export default Registration;
