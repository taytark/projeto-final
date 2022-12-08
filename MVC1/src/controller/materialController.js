const materialModel = require("../models/materialModel");
const multerConfig = require("../config/multer");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const BUCKET = process.env.BUCKET;
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const uploadNewMaterial = async (req, res) => {
  try {
    const authHeader = req.get("authorization");

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Você precisa estar logado para editar um post!" });
    }
    const token = authHeader.split(" ")[1];
    await jwt.verify(token, SECRET, async function (erro) {
      if (erro) {
        return res.status(403).send("Erro de autentificação");
      }
      const { originalname: nome, releaseDate, description } = req.file;

      const newMaterial = new materialModel({
        nome,
        releaseDate,
        description,
      });
      const savedMaterial = await newMaterial.save();
      res.status(201).send({
        message: "Successfully uploaded " + req.file.location + " location!",
        savedMaterial,
      });
      //res.status(201).send('Successfully uploaded ' + req.file.location + ' location!')
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
}; //funcionando no mongo e s3

const findAllMaterial = async (req, res) => {
  try {
    const authHeader = req.get("authorization");

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Você precisa estar logado para editar um post!" });
    }
    const token = authHeader.split(" ")[1];
    await jwt.verify(token, SECRET, async function (erro) {
      if (erro) {
        return res.status(403).send("erro de autentificação");
      }
      const allMateriais = await materialModel.find();
      res.status(200).json(allMateriais);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}; //funcionando

const findDownloadMaterial = async (req, res) => {
  const filename = req.params.filename;
  const downloadMaterial = await multerConfig.s3
    .getObject({ Bucket: BUCKET, Key: filename })
    .promise();
  res.send(downloadMaterial.Body);
}; //funcionando

const findMaterialById = async (req, res) => {
  try {
    const authHeader = req.get("authorization");

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Você precisa estar logado para editar um post!" });
    }
    const token = authHeader.split(" ")[1];
    await jwt.verify(token, SECRET, async function (erro) {
      if (erro) {
        return res.status(403).send("erro de autentificação");
      }
      const findMaterialId = await materialModel.findById(req.params.id);
      res.status(200).json(findMaterialId);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}; //funcionando

const deleteMaterial = async (req, res) => {
  try {
    const authHeader = req.get("authorization");

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Você precisa estar logado para editar um post!" });
    }
    const token = authHeader.split(" ")[1];
    await jwt.verify(token, SECRET, async function (erro) {
      if (erro) {
        return res.status(403).send("erro de autentificação");
      }
      const { id, filename } = req.body;

      await multerConfig.s3
        .deleteObject({ Bucket: BUCKET, Key: filename })
        .promise();

      const deleteMaterial = await materialModel.findByIdAndDelete(id);
      const message = `Material with id ${deleteMaterial._id} was successfully deleted`;
      res.status(200).json({ message });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}; //funcionando no mongo e s3

const updateMaterialById = async (req, res) => {
  try {
    const authHeader = req.get("authorization");

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Você precisa estar logado para editar um post!" });
    }
    const token = authHeader.split(" ")[1];
    await jwt.verify(token, SECRET, async function (erro) {
      if (erro) {
        return res.status(403).send("erro de autentificação");
      }
      const { description} = req.body;
      const updateMaterial = await materialModel.findByIdAndUpdate(
        req.params.id,
        {
          description,
        }
      );

      res
        .status(200)
        .json({ message: "Material successfully updated", updateMaterial });
    });
  } catch {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};// funcionando

module.exports = {
  findAllMaterial,
  findMaterialById,
  uploadNewMaterial,
  findDownloadMaterial,
  updateMaterialById,
  deleteMaterial,
};
