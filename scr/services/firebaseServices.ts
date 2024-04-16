import CollectionPath from '../const/CollectionPath';
import {
    DocumentData,
    OrderByDirection,
    deleteDoc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
} from 'firebase/firestore';
import firebaseInitialize from '../initialize/firebaseInitialize';
import Dog from '../types/Dog';

type AllTypeKey = keyof Dog;

const { docRef, collectionRef } = firebaseInitialize();

const firebaseServices = {
    async getDoc(
        collectionPath: CollectionPath,
        docId: string,
    ): Promise<DocumentData> {
        const docSnapshot = await getDoc(await docRef(collectionPath, docId));
        const data = docSnapshot.data();
        console.log('🚀 ~ file: firebaseServices.ts:23 ~ getDoc ~ data:', data);

        return data;
    },

    async getCollection(
        collectionPath: CollectionPath,
    ): Promise<DocumentData[]> {
        const collectionSnapshot = await getDocs(
            await collectionRef(collectionPath),
        );
        const dataList = collectionSnapshot.docs.map((doc) => doc.data());
        console.log(
            '🚀 ~ file: firebaseServices.ts:16 ~ getCollection ~ dataList:',
            dataList,
        );

        return dataList;
    },

    async addDoc(
        collectionPath: CollectionPath,
        docId: number,
        addObj: any,
    ): Promise<{ result: boolean; msg: string }> {
        try {
            await setDoc(
                await docRef(collectionPath, docId.toString()),
                addObj,
            );

            return Promise.resolve({ result: true, msg: '' });
        } catch (error) {
            console.log('🚀 ~ file: firebaseServices.ts:63 ~ error:', error);
            return Promise.reject({ result: false, msg: error.toString() });
        }
    },

    async deleteDoc(
        collectionPath: CollectionPath,
        docId: string,
    ): Promise<{ result: boolean; msg: string }> {
        try {
            await deleteDoc(await docRef(collectionPath, docId));
            return { result: true, msg: '' };
        } catch (error) {
            console.log('🚀 ~ file: firebaseServices.ts:72 ~ error:', error);
            return { result: false, msg: error.toString() };
        }
    },

    async downloadFile(remoteFilePath: string) {},

    async uploadFile(remoteFilePath: string, filePath: string) {},

    async getNextId(
        collectionPath: CollectionPath,
        orderKey: AllTypeKey,
        direction: OrderByDirection = 'desc',
        limitNum: number = 1,
    ) {
        const querySnapshot = await getDocs(
            await query(
                await collectionRef(collectionPath),
                orderBy(orderKey, direction),
                limit(limitNum),
            ),
        );
        const data = querySnapshot.docs.map((doc) => doc.data())[0][orderKey];
        console.log(
            '🚀 ~ file: firebaseServices.ts:16 ~ getNextId ~ data:',
            data,
        );

        return data + 1;
    },
};

export default firebaseServices;
