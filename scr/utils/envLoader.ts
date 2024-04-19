import { config } from 'dotenv';

const envLoader = () => {
    config();
    console.log('Loading .env', process.env);
};

export default envLoader;
