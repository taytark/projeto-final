const { Location, HttpRequest } = require("aws-sdk");
const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  nome: { type: String },
  releaseDate: {
    type: Date,
    default: Date.toLocaleString("br", { timeZone: "America/Sao_Paulo" }),
  },
  description: {
    type: String,
    default: "No description",
  },
});

const Model = mongoose.model("material", materialSchema);

module.exports = Model;
