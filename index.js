const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT_URL;

const database = require("./config/database");
database.connect();

const Task = require("./model/task.model");

app.get("/tasks/detail/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const tasks = await Task.findOne({
            _id: id,
            deleted: false
        });
        console.log(tasks);
        res.json(tasks);
    } catch (error) {
        res.json("Không tìm thấy!!!");
    }


    // const tasks = await Task.find({
    //     deleted: false,
    // })
});

app.listen(port, () => {
    console.log(`Kết nối thành công với http://localhost:${port}`)
}) 