class Dog {
    id: number;
    name: string;
    dateOfBirth: number; // UTC Epoch time
    sex: 'M' | 'F';
    breeds: string;
    photo: string;
    description: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.dateOfBirth = 0;
        this.sex = 'M';
        this.breeds = '';
        this.photo = '';
        this.description = '';
    }
}

export default Dog;
