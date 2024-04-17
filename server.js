require("dotenv").config({ path: "./config/.env" });
const express = require("express");
app = express();
const PORT = process.env.PORT || 8080;
var cors = require('cors')

const userRouter = require("./app/router/userRouter");
require("./config/connection");

app.use('/upload', express.static('upload'));
app.use('/public', express.static('public'));
// app.use(express.static('public'));
app.use(cors())

app.use(express.json())
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
