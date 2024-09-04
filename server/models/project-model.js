const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
  title: { type: String, requireq: true },
  author: { type: Schema.Types.ObjectId, required: true },
  created_at: { type: Number, requireq: true },
});

module.exports = model("Project", ProjectSchema);
