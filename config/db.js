import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`DB is connected to ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error in MongoDB: ${error}`);
    }
};

export default connectDB;
