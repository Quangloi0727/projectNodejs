const Users = require('../modals/users.js')
module.exports = function init(socket) {
    console.log("Have agent connect :" + socket.id)
    socket.on("disconnect", function () {
        console.log("Agent disconnect", socket.id)
    })
    socket.on("ChangeUser", function (data) {
        console.log("User change là:", data)
        Users.findByIdAndUpdate(data, { username: 'username change complete !' }, function (err, result) {
            if (result) {
                sio.to(socket.id).emit('ChangeDone', 'Update Success !')
            }
        })
    })
};