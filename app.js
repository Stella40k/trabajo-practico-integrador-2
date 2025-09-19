import express from "express";
import cors from "cors"
import "dotenv/config";
import {connect} from "./src/configs/database.config.js"
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.listen(PORT, async ()=>{
    await connect();
    console.log(`Server listen ${PORT}`)
});