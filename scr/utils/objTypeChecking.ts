export default (a: Object, b: Object) => {
    return JSON.stringify(Object.keys(a)) === JSON.stringify(Object.keys(b));
};
