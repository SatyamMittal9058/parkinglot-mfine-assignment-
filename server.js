const express=require('express');
const server=express();
const bodyparser=require('body-parser');

require('dotenv').config();
const dbconfig=require("./dbconfig/dbconfig");
server.use(bodyparser.json());

const contractApi=require('./routes/parkingRoutes');
server.use("/api",contractApi);


const port=5000;
server.get("/",(req,res)=> res.send("it is working"));
server.listen(port, () => console.log(`Node Express Server Started at ${port}!`));