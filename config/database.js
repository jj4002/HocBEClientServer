const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Kết nối thành công database", mongoose.connection.name);
    } catch (error) {
        console.log("Kết nối thất bại", error.message);
    }
}