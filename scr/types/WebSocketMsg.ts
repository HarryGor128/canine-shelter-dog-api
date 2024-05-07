import ChatMessage from './ChatMessage';

class WebSocketMsg {
    changeType: 'added' | 'modified' | 'removed';
    data: ChatMessage;

    constructor() {
        this.changeType = 'added';
        this.data = new ChatMessage();
    }
}

export default WebSocketMsg;
