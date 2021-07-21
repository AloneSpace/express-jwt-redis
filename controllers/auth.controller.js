const User = require("../models/User");
const { generateTokens, validToken } = require("../services/jwt");

exports.login = async function (req, res) {
    let { username, password } = req.body;
    let login_success = User.Login({ username, password });
    if (!login_success)
        return res
            .status(401)
            .json({ message: "Username or Password incorrect" });
    return res.json(generateTokens(req.body));
};

exports.register = async function (req, res) {
    let { username, email, password } = req.body;
    let user_info = User.Register({ username, email, password });
    return res
        .status(user_info ? 200 : 400)
        .json({ message: user_info ? "User created" : "User exist" });
};

exports.profile = async function (req, res) {
    try {
        let access_token = req.headers["x-access-token"];
        let refresh_token = req.headers["refresh_token"];
        if (!access_token || !refresh_token) throw Error("Token not found");
        let valid_token = await validToken(access_token, refresh_token);
        return res.json({ message: "Secure" });
    } catch (e) {
        return res.status(401).json({ message: e.message });
    }
};

exports.refresh_token = async function (req, res) {
    try {
    } catch (e) {}
};
