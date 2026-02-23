const express = require("express");
const mintRoutes = require("./routes/mintRoutes");

const app = express();

app.use(express.json());
app.use("/api", mintRoutes);

module.exports = app;
