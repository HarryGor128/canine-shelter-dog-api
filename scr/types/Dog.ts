class Dog {
    id: string;
    name: string;
    dateOfBirth: number; // Timestamp, UTC Epoch time
    sex: 'M' | 'F';
    photo: string;
    description: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.dateOfBirth = 0;
        this.sex = 'M';
        this.photo = '';
        this.description = '';
    }
}
