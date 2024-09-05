const { Schema, model } = require("mongoose");

const AccessSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  project_id: { type: Schema.Types.ObjectId, ref: "Project" },
});

module.exports = model("Access", AccessSchema);
