const controller = require("../controllers/auth.controller");

module.exports = (express) => {
    const route = express.Router();

    route.get("/", controller.getAll);

    route.post("/login", controller.login);
    route.post("/register", controller.register);
    route.get("/profile", controller.profile);
    route.post("/refresh_token", controller.refresh_token);

    return route;
};
