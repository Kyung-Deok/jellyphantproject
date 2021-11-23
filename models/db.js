const mongoose = require("mongoose");
import dotenv from "dotenv";
dotenv.config();
// mongoose 설정
mongoose.connect(process.env.MONGO_URL);
 
export const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
    console.log('Connected to mongodb Server')
 });