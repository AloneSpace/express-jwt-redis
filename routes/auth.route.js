const controller = require("../controllers/auth.controller");

module.exports = (express) => {
    const route = express.Router();

    route.get("/", (req, res) => {
        res.json({ message: "เข้า" });
    });

    route.post("/login", controller.login);
    route.post("/register", controller.register);
    route.get("/profile", controller.profile);

    return route;
};
