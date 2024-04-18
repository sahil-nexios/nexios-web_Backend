require("dotenv").config({ path: "./config/.env" });
const express = require("express");
app = express();
const PORT = process.env.PORT || 8080;
var cors = require('cors')

const userRouter = require("./app/router/userRouter");
// require("./config/connection");

app.use('/upload', express.static('upload'));
app.use('/public', express.static('public'));
// app.use(express.static('public'));
app.use(cors())
// app.use(cors({ origin: '*' }));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     next();
// });

app.use(express.json())
app.use(userRouter);
app.all("*", (req, res) => {
    res.send("URL not found")
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
