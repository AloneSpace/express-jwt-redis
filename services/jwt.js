const jwt = require("jsonwebtoken");
const redis = require("redis").createClient();

function generateTokens({ username, email }) {
    try {
        let access_token = jwt.sign(
            { username, email },
            process.env.SECRET_TOKEN,
            {
                expiresIn: "10s",
            }
        );
        let refresh_token = jwt.sign(
            { username, email },
            process.env.SECRET_TOKEN,
            { expiresIn: "6h" }
        );
        redis.set(
            username,
            JSON.stringify({
                refresh_token,
                expires: new Date() + 60 * 60 * 24 * 30,
            })
        );
        return {
            access_token,
            refresh_token,
        };
    } catch (e) {
        console.log(e);
    }
}

function validToken() {
    try {
    } catch (e) {}
}

module.exports = {
    generateTokens,
    validToken,
};
