const jwt = require("jsonwebtoken");
const redis = require("redis");
const client = redis.createClient();

function generateTokens({ username }) {
    try {
        let access_token = generateAccessToken({ username });
        let refresh_token = generateRefreshToken({ username });
        client.set(username, refresh_token, redis.print);
        return {
            access_token,
            refresh_token,
        };
    } catch (e) {
        console.log(e);
    }
}

function generateAccessToken({ username }) {
    return jwt.sign({ username }, process.env.SECRET_TOKEN, {
        expiresIn: "15m",
    });
}

function generateRefreshToken({ username }) {
    return jwt.sign({ username }, process.env.SECRET_TOKEN);
}

async function validToken(access_token, refresh_token) {
    try {
        let decoded = await decodedToken(access_token);
        let getRefreshTokenFromRedis = await getCacheById(decoded.username);
        if (getRefreshTokenFromRedis !== refresh_token)
            throw Error("Token get changed.");
    } catch (e) {
        throw Error(e.message);
    }
}

function decodedToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
            if (err) return reject(Error("Token is expired."));
            resolve(decoded);
        });
    });
}

function getCacheById(key) {
    return new Promise((resv, rej) => {
        client.get(key, (err, reply) => {
            if (reply) resv(reply);
            rej(Error("No Token"));
        });
    });
}

module.exports = {
    generateTokens,
    validToken,
};
