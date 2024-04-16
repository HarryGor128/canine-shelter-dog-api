class Dog {
    id: number;
    name: string;
    dateOfBirth: { seconds: number; nanoseconds: number }; // Timestamp, UTC Epoch time
    sex: 'M' | 'F';
    photo: string;
    description: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.dateOfBirth = { seconds: 0, nanoseconds: 0 };
        this.sex = 'M';
        this.photo = '';
        this.description = '';
    }
}

export default Dog;
