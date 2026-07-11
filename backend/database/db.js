import mongoose from "mongoose";

export const dbConnection =  () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Chat_App_DB",

    })
    .then(() => {
    console.log("MongoDB connected successfully.");
    })
    .catch((err) => {    
        console.error(`MongoDB connection error: ${err.message||err}`);
        process.exit(1);
   });
};