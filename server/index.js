const express = require("express");
const cors = require("cors");

const app = express();
require('dotenv').config();

app.use(cors({
    origin:'http://localhost:5173'
}));