const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT_URL;

const database = require("./config/database");
database.connect();

const routerApiVer1 = require("./api/v1/routes/index.route");
routerApiVer1(app);

app.listen(port, () => {
    console.log(`Kết nối thành công với http://localhost:${port}`)
}) 