require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
