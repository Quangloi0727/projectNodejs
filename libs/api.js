const Users = require('../modals/users.js')
const jwt = require('jsonwebtoken')
let ACCESS_TOKEN_SECRET = 'loinq@4321'
const acceptPath = {
    'getListUser': {
        method: 'GET'
    },
    'login': {
        method: 'POST'
    }
};

exports.getListUser = async function (req, res) {
    let usersList = await Users.find({})
    return res.json({
        code: 200,
        message: usersList
    });
}


exports.auth = function (req, res) {
    var _this = this;
    var action = req.path.split('/')[2];
    var method = req.method;

    if (_.isEqual(action, 'login') && _.isEqual(method, 'POST')) {
        return _this.login(req, res);
    }

    authenticate(action, method, req, function (auth) {
        if (auth.status !== 200) {
            return res.status(200).json({
                code: 400,
                message: auth.message
            });
        } else {
            return _this[action](req, res);
        }
    })
}

exports.login = async function (req, res) {
    var _body = _.pick(req.body, 'username', 'password');

    if (!_.has(req.body, 'username') || !_.has(req.body, 'password')) {
        return res.json({
            code: 406,
            message: 'Missing parameter'
        });
    }

    let user = await Users.findOne({ username: _body.username, password: _body.password }).lean();

    if (!user) {
        return res.json({
            code: 406,
            message: 'Incorrect username or password !'
        })
    }

    let token = await jwt.sign({
        _id: user._id,
        username: user.name
    }, ACCESS_TOKEN_SECRET, {
        expiresIn: '600s'
    });

    return res.json({
        code: 200,
        token: token
    })
}

function authenticate(action, method, req, callback) {

    if (!_.has(acceptPath, action)) {
        return callback(new Error('404 | Page not found'), null);
    }

    if (!_.isEqual(acceptPath[action].method, method)) {
        return callback(new Error('Invalid-method'), null);
    }

    if (!req.headers.authorization) {
        return callback(new Error('Invalid-token'), null);
    } else {
        jwt.verify(req.headers.authorization, ACCESS_TOKEN_SECRET, function (error, decoded) {
            if (error) {
                return callback(new Error('Invalid-token'), null);
            }
            return callback({
                status: 200
            });
        });
    }
}