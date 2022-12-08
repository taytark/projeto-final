const autenticacaoModel = require("../models/autenticacaoModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const createUser = (req, res) => {
  const { nome, email, senha } = req.body;
  const senhaHash = bcrypt.hashSync(senha, 10);
  const create = new autenticacaoModel({ nome, email, senha: senhaHash });
  create.save(function (error) {
    if (error) {
      res.status(500).json({ message: error.message });
    }
    res.status(201).json(create);
  });
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await autenticacaoModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const login = (req, res) => {
  autenticacaoModel.findOne({ email: req.body.email }, function (error, user) {
    if (!user) {
      return res
        .status(404)
        .send("Este e-mail não é válido ou não está cadastrado!");
    }

    const senhaValida = bcrypt.compareSync(req.body.senha, user.senha);

    if (!senhaValida) {
      return res.status(403).send("Senha incorreta! Tente novamente!");
    }

    const token = jwt.sign({ email: req.body.email }, SECRET);
    res.status(200).json(token);
  });
};

module.exports = {
  createUser,
  deleteById,
  login,
};
