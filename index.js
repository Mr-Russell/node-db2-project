const express = require("express");

const server = express();

server.use(express.json());

const carsRouter = require("./routers/carsRouter.js")

server.use("/api/cars", carsRouter)

const port = process.env.PORT || 8000;

server.listen(port, ()=> console.log(`\n === Server Running on Port ${port} ===\n`))