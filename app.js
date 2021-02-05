// sets all env variables defined in the .env
require("dotenv").config();

const port = Number(process.env.PORT) || 6000;
const express = require("express");
const app = express();
const morgan = require("morgan");

// So that express can read JSON objects
app.use(express.json());
app.use(morgan("dev"));

// runs index.js controller
app.use(require("./controllers"));

// Listen for http requests
app.listen(port, (error) => {
  if (error) throw error;
  console.log(`App is running at ${port}`);
});
