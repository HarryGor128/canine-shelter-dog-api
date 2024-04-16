class Dog {
    id: string;
    name: string;
    dateOfBirth: { seconds: number; nanoseconds: number }; // Timestamp, UTC Epoch time
    sex: 'M' | 'F';
    photo: string;
    description: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.dateOfBirth = { seconds: 0, nanoseconds: 0 };
        this.sex = 'M';
        this.photo = '';
        this.description = '';
    }
}
