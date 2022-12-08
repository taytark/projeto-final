const express = require("express")
const router = express.Router()
const controller = require("../controller/autenticacaoController")

router.post("/add", controller.createUser)
router.post("/login", controller.login)
router.delete("/:id", controller.deleteById)

module.exports = router