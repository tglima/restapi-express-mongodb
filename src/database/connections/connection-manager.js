import mongoose from 'mongoose';

export const getDbConnection = () => {
  const envMode = `${process.env.NODE_ENV || 'develop'}`;

  const connectionString = process.env.MONGODB_CONNECTION_STRING.replace(
    '<password>',
    process.env.MONGODB_PASS
  );

  if (envMode !== 'test') {
    mongoose.connect(connectionString);
  }
};
