class ChatMessage {
    id: number;
    email: string;
    msg: string;
    type: 'text' | 'img';
    createTime: number;
    lastUpdate: number;

    constructor() {
        this.id = 0;
        this.email = '';
        this.msg = '';
        this.type = 'text';
        this.createTime = 0;
        this.lastUpdate = 0;
    }
}

export default ChatMessage;
