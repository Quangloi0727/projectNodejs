const Users = require('../modals/users.js')
exports.users = function (req, res) {
    Users.find({}, function (err, data) {
        if (data) {
            res.render('users', { title: 'Danh sách tài khoản !', listUsers: data })
        }
    })
    //res.json({code:200,listUsers:[{_id1:1,_id2:2}]})
}
exports.usersAdd = function (req, res) {
    const user = new Users({
        username: 'diemlt',
        password: 'ltd@4321',
        email: 'diemlt@gmail.com'
    })
    user.save(err => {
        if (err) {
            console.log("insert fail", err)
        } else {
            console.log("insert success")
        }
    })
}   