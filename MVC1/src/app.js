const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger/swagger_output.json");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./database/dbConnect");
const materialRoute = require("./routes/materialRoute");
const autenticacaoRoute = require("./routes/autenticacaoRoute");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect();

app.use("/materialstore/material", materialRoute);
app.use("/materialstore/user", autenticacaoRoute);
app.use(
  "/minha-rota-de-documentacao",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile)
);

module.exports = app;
