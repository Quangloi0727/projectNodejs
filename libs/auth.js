const _api = require('./api.js')
exports.auth = function (req, res, next) {
    if (_.isEqual(req.path.indexOf('/api'), 0)) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        return _api.auth(req, res);
    }else{
        next();
    }
}