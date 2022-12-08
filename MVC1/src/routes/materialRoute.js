const express = require("express");
const router = express.Router();
const controller = require("../controller/materialController");
const multerConfig = require("../config/multer")


router.post("/add", multerConfig.upload.single('file'), controller.uploadNewMaterial);
router.get("/all", controller.findAllMaterial);
router.get("/:id", controller.findMaterialById);
router.get("/download/:filename", controller.findDownloadMaterial);
router.delete("/delete", controller.deleteMaterial);
router.patch("/update/:id", controller.updateMaterialById);

module.exports = router;