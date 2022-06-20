module.exports = theCatch => (req, res, next) => {

    Promise.resolve(theCatch(req, res, next)).catch(next);
}