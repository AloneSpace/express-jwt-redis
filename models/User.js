class User {
    constructor() {}

    static Login({ username, password }) {
        if (!username && !password) return false;
        let user = this.findExistUser(username);
        return this.comparePassword(password, user.salt, user.hash);
    }

    static Register({ username, email, password }) {
        if (!username && !email && !password) return false;
        if (Object(this.findExistUser(username)).hasOwnProperty("username"))
            return false;
        const password_gen = this.generatePassword(password);
        return this.write2JSON([
            ...this.findAll(),
            {
                username,
                email,
                salt: password_gen.salt,
                hash: password_gen.hash,
            },
        ]);
    }

    static generatePassword(password = "") {
        const { setPassword } = require("../services/password");
        return setPassword(password);
    }

    static comparePassword(password = "", salt = "", hash = "") {
        const { validPassword } = require("../services/password");
        return validPassword(password, salt, hash);
    }

    static write2JSON(users = []) {
        const fs = require("fs");
        fs.writeFileSync(
            `${process.cwd()}/data/users.json`,
            JSON.stringify(users, null, "\t")
        );
        return true;
    }

    static findExistUser(username = "") {
        return this.findAll().find((user) => user.username === username);
    }

    static findAll() {
        return require("../data/users.json");
    }
}

module.exports = User;
