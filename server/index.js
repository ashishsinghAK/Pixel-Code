const express = require("express");
const cors = require("cors");


const userRoute = require('./route/userRoute');
const profileRoute = require('./route/profileRoute');
const paymentRoute = require('./route/paymentRoute');
const courseRoute = require('./route/courseRoute');

const database = require('./config/database');
const cookieParser = require("cookie-parser");
const { cloudinaryConnect } = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

const app = express();
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));

const PORT = process.env.PORT || 4000;

// database connection
database.connect();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);

//default route
app.get("/", (req, res) => {
    return res.json({
        success: false,
        message: "Your Server is running"
    })
});

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
})