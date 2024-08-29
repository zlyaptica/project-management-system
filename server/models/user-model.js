const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, requireq: true },
  nickname: { type: String, requireq: true },
  password: { type: String, requireq: true },
});

module.exports = model("User", UserSchema);
