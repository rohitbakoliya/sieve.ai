import mongoose from 'mongoose';

const connectDB = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database'))
  .catch(() => {
    console.log('Failed to connect to database.');
  });

export default connectDB;
