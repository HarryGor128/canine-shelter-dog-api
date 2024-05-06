import firebaseServices from './firebaseServices';

const favoritesServices = {
    async getFavoritesListByEmail(email: string): Promise<number[]> {
        const result = await firebaseServices.getDoc('favorites', email);

        return result ? result.id : [];
    },
};

export default favoritesServices;
