import { onSnapshot } from 'firebase/firestore';
import WebSocket from 'ws';
import firebaseInitialize from './initialize/firebaseInitialize';
import WebSocketMsg from './types/WebSocketMsg';
import ChatMessage from './types/ChatMessage';

const { collectionRef } = firebaseInitialize();

const webSocketServices = async () => {
    const wsService = new WebSocket.Server({ port: 10000 });

    const colRef = await collectionRef('chat');

    wsService.on('connection', (ws) => {
        onSnapshot(colRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const msg: WebSocketMsg = {
                    changeType: change.type,
                    data: change.doc.data() as ChatMessage,
                };
                ws.send(JSON.stringify(msg));
            });
        });
    });
};

export default webSocketServices;
