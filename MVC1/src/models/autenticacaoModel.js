const mongoose = require("mongoose");

const autenticacaoSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },
    nome: { type: String },
    email: { type: String },
    senha: { type: String },
  },
  { versionKey: false }
);

const Model = mongoose.model("user", autenticacaoSchema);

module.exports = Model;
