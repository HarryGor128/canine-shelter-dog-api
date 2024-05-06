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
    where,
} from 'firebase/firestore';
import firebaseInitialize from '../initialize/firebaseInitialize';
import Dog from '../types/Dog';
import {
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import {
    getDownloadURL,
    ref,
    uploadString,
    deleteObject,
} from 'firebase/storage';
import FileStoragePath from '../const/FileStoragePath';

type AllTypeKey = keyof Dog;

export type fireStoreRes = { result: boolean; msg: string };

type authRes = fireStoreRes & { userCredential?: UserCredential };

const { docRef, collectionRef, authRef, storageRef } = firebaseInitialize();

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
        field?: string,
        key?: number[] | string[],
    ): Promise<DocumentData[]> {
        const colRef = await collectionRef(collectionPath);

        const collectionSnapshot = await getDocs(
            key && field ? query(colRef, where(field, 'in', key)) : colRef,
        );
        let dataList = collectionSnapshot.docs.map((doc) => doc.data());

        console.log(
            '🚀 ~ file: firebaseServices.ts:16 ~ getCollection ~ dataList:',
            dataList,
        );

        return dataList;
    },

    async addDoc(
        collectionPath: CollectionPath,
        docId: number | string,
        addObj: any,
    ): Promise<fireStoreRes> {
        try {
            await setDoc(
                await docRef(collectionPath, docId.toString()),
                addObj,
            );

            return Promise.resolve({ result: true, msg: '' });
        } catch (error) {
            console.log('🚀 ~ file: firebaseServices.ts:63 ~ error:', error);
            return Promise.resolve({ result: false, msg: error.toString() });
        }
    },

    async deleteDoc(
        collectionPath: CollectionPath,
        docId: string,
    ): Promise<fireStoreRes> {
        try {
            await deleteDoc(await docRef(collectionPath, docId));
            return Promise.resolve({ result: true, msg: '' });
        } catch (error) {
            console.log('🚀 ~ file: firebaseServices.ts:72 ~ error:', error);
            return Promise.resolve({ result: false, msg: error.toString() });
        }
    },

    async uploadBase64(
        remoteFilePath: FileStoragePath,
        filename: string,
        base64String: string,
    ): Promise<fireStoreRes> {
        try {
            const Ref = ref(
                await storageRef(),
                `${remoteFilePath}/${filename}`,
            );

            await uploadString(Ref, base64String, 'data_url');

            const url = await getDownloadURL(Ref);
            return Promise.resolve({ result: true, msg: url });
        } catch (error) {
            console.log('🚀 ~ file: firebaseServices.ts:101 ~ error:', error);
            return Promise.resolve({ result: false, msg: error.toString() });
        }
    },

    async deleteFileByURL(
        remoteFilePath: FileStoragePath,
        fileUrl: string,
    ): Promise<fireStoreRes> {
        try {
            const fileName = fileUrl
                .replace(
                    `https://firebasestorage.googleapis.com/v0/b/canine-shelter-dog-api.appspot.com/o/${remoteFilePath}%2F`,
                    '',
                )
                .split('?')[0];

            const Ref = ref(
                await storageRef(),
                `${remoteFilePath}/${fileName}`,
            );

            await deleteObject(Ref);

            return Promise.resolve({ result: true, msg: '' });
        } catch (error) {
            console.log('🚀 ~ file: firebaseServices.ts:136 ~ error:', error);
            return Promise.resolve({ result: false, msg: error.toString() });
        }
    },

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

    async loginEmail(email: string, password: string): Promise<authRes> {
        try {
            const user = await signInWithEmailAndPassword(
                await authRef(),
                email,
                password,
            );

            return Promise.resolve({
                result: true,
                msg: '',
                userCredential: user,
            });
        } catch (error) {
            console.log(
                '🚀 ~ file: firebaseServices.ts:109 ~ login ~ error:',
                error,
            );
            return Promise.resolve({ result: false, msg: error.toString() });
        }
    },

    async registration(email: string, password: string): Promise<authRes> {
        try {
            const user = await createUserWithEmailAndPassword(
                await authRef(),
                email,
                password,
            );

            return Promise.resolve({
                result: true,
                msg: '',
                userCredential: user,
            });
        } catch (error) {
            console.log(
                '🚀 ~ file: firebaseServices.ts:134 ~ registration ~ error:',
                error,
            );
            return Promise.resolve({
                result: false,
                msg: error.toString(),
            });
        }
    },
};

export default firebaseServices;
