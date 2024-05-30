import { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    key: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    dateRegister: { type: String, required: true },
  },
  { _id: false }
);

const authSchema = new Schema(
  {
    mode: { type: String, required: true },
    users: [userSchema],
  },
  { _id: false }
);

const appConfigSchema = new Schema(
  {
    displayName: { type: String, required: true },
    sessionTimeout: { type: Number, required: true },
    cacheTimeout: { type: Number, required: true },
    uri: { type: String, required: false },
    auth: authSchema,
  },
  { _id: false }
);

const gitInfoSchema = new Schema(
  {
    uri: { type: String, required: true },
    branches: [String],
  },
  { _id: false }
);

const AppDbSchema = new Schema(
  {
    appName: { type: String, required: true },
    appType: { type: String, required: true },
    appConfig: appConfigSchema,
    appVersion: { type: String, required: true },
    gitInfo: gitInfoSchema,
  },
  { versionKey: false }
);

export default AppDbSchema;
