import mongoose from "mongoose";

const connectDB = async () => {
	const mongoUri = process.env.MONGO_URI;

	if (!mongoUri) {
		console.warn("MONGO_URI is not set; starting without a database connection.");
		return;
	}
	await mongoose.connect(mongoUri);
	console.log("Connected to MongoDB.");
};

export default connectDB;
