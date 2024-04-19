export default (a: Object, b: Object) => {
    return (
        JSON.stringify(Object.keys(a).sort((a, b) => (a > b ? 1 : -1))) ===
        JSON.stringify(Object.keys(b).sort((a, b) => (a > b ? 1 : -1)))
    );
};
