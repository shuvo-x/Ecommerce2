const app = require('./app');
const cloudinary = require("cloudinary");
const connectDatabase = require('./config/database');


//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
   console.log(`Error: ${err.message}`);
   console.log(`Shutting down the server due to Uncaught Exceptions`);
   process.exit(1);
});

//Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

//CONNECTING DATABASE
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejections

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    ServiceWorkerRegistration.close(()=>{
        process.exit(1);
    })
})