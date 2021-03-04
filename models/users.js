const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dbSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const Users = mongoose.model("users", dbSchema);
module.exports = Users;
