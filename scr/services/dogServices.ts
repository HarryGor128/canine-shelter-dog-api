export interface BreedsList {
    message: { [key: string]: string[] };
    status: string;
}

const dogServices = {
    async getBreedsList(): Promise<BreedsList> {
        return fetch('https://dog.ceo/api/breeds/list/all')
            .then((result) => {
                return result.json();
            })
            .catch((error) => {
                console.log(
                    '🚀 ~ file: dogServices.ts:18 ~ returnfetch ~ error:',
                    error,
                );
            });
    },

    getBreedImg(breed: string): Promise<string> {
        return fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                return result.message;
            })
            .catch((error) => {
                console.log(
                    '🚀 ~ file: dogServices.ts:28 ~ .then ~ error:',
                    error,
                );
            });
    },
};

export default dogServices;
