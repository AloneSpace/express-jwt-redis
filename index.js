const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

//* Set up router
require("./routes/index")({ express, app });

//* Set up redis
require("./services/jwt");

//* Listen port
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
