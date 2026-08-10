import mongoose from "mongoose";

export default async function connectMongoDB(url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB Conneected!");
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}
