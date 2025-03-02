const express = require("express");
const router = express.Router();

const Task = require("../../../model/task.model");

//const controller = require("");

router.get("/", async (req, res) => {
    const find = {
        deleted: false,
    };

    if (req.query.status) {
        find.status = req.query.status;
    }

    console.log(req.query);
    //Sort
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    }
    //End Sort

    const tasks = await Task.find(find).sort(sort);
    res.json(tasks);
});

router.get("/detail/:id", async (req, res) => {
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
});


module.exports = router;
