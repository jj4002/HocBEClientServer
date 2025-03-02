const paginationHelper = require("../../../helpers/pagination");
const Task = require("../../../model/task.model");


//GET api/v1/tasks
module.exports.index = async (req, res) => {
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

    //Pagination
    let initPagination = {
        currentPage: 1,
        limitItems: 2,
    };

    const countTasks = await Task.countDocuments(find);
    const objectPagination = paginationHelper(
        initPagination,
        req.query,
        countTasks,
    );
    //End Pagination

    const tasks = await Task.find(find)
        .sort(sort)
        .skip(objectPagination.skip)
        .limit(objectPagination.limitItems)
    res.json(tasks);
};

//GET api/v1/tasks/detail/id
module.exports.detail = async (req, res) => {
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
};