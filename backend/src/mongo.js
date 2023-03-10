import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import { dataInit } from "./upload";

const connect = async () => {
    dotenv.config();
    if (!process.env.MONGO_URL) {
        console.error("Missing MONGO_URL!!!");
        process.exit(1);
    }
    mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async (res) => {
        if (process.env.MODE === "RESET") {
          // reset db
          await dataInit();
        }
        console.log("mongo db connection created")
    });
  
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
}

export default { connect };