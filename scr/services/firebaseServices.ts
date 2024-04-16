import CollectionPath from '../const/CollectionPath';

import { collection, DocumentData, getDocs } from 'firebase/firestore';
import firebaseInitialize from '../initialize/firebaseInitialize';

const firebase = firebaseInitialize();

const firebaseServices = {
    getDoc(collectionPath: CollectionPath, doc: string) {},
    async getCollection(
        collectionPath: CollectionPath,
    ): Promise<DocumentData[]> {
        const colRef = await collection(firebase.getFirestore, collectionPath);
        const colSnapshot = await getDocs(colRef);
        const dataList = colSnapshot.docs.map((doc) => doc.data());
        console.log(
            '🚀 ~ file: firebaseServices.ts:16 ~ getCollection ~ dataList:',
            dataList,
        );

        return dataList;
    },
    addDoc(collectionPath: CollectionPath, addObj: any) {},
    updateDoc(collectionPath: CollectionPath, doc: string, updateObj: any) {},
    deleteDoc(collectionPath: CollectionPath, doc: string) {},
    downloadFile(remoteFilePath: string) {},
    uploadFile(remoteFilePath: string, filePath: string) {},
};

export default firebaseServices;
