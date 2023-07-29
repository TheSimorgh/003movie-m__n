require("express-async-errors");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./src/config/database");
mongoose.set("strictQuery", true);
const routes =require("./src/routes/index");
const { handleNotFound } = require("./src/utils/helpers");
const {errorHandler} =require("./src/midd/error")

const app = express();
// const http = require("http");
// const { readdirSync } = require("fs");
// sendEmail("kainorling","11")
// sendResetCode("kainorling","sss","dsdsds")
//middlewares

// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//cors middleware 
app.use(cors());

// const corsOpts = {
//     // origin: "http://localhost:5173/",
//     origin: "*",

//     credentials: true,
//     methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
//     allowedHeaders: ['Content-Type'],
//     exposedHeaders: ['Content-Type']
// };
// app.use(cors(corsOpts));

// const server = http.createServer(app);
//? Start the server


// app.get("/",(req,res)=>{res.send("XXXXXXX")})
// readdirSync("./routes").map((r)=>app.use("/",require("./routes/"+r)))
// readdirSync("./src/routes/").map((r)=>app.use(`/api/v1/${r}/`,require("./src/routes/"+r)))
// app.use(morgan("dev"));
app.use("/api/", routes);
app.use("/*",handleNotFound)
//handling async await error in ordeer to hanlde need install pacakge called 
app.use(errorHandler)


;(async function server() {
    try {
        const PORT = process.env.PORT || 9000;  
      connectDB()
    //   server.listen(PORT, console.log(`Server is running on port ${PORT}`));  
    app.listen(process.env.PORT,()=>{ console.log(`Server is Running ${process.env.PORT}`);})
    } catch (error) {
      console.log(`server Error ${error}`);
    }
  })();