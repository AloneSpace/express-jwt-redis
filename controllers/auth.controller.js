const User = require('../models/User')

exports.login = async function(req, res) {
    let {username, password} = req.body
    res.json({test: User.Login({username, password})})
}

exports.register = async function(req, res) {
    let {username, email, password} = req.body
    let user_info = User.Register({username,email,password})
    return res.status(user_info ? 200 : 400).json({message: user_info ? 'User created' : 'User exist'})
}