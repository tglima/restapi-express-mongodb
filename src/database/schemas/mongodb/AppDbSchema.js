import { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    key: { type: String, required: true },
    is_active: { type: Boolean, required: true },
    dt_register: { type: String, required: true },
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
    display_name: { type: String, required: true },
    session_timeout: { type: Number, required: true },
    cache_timeout: { type: Number, required: true },
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
    app_name: { type: String, required: true },
    app_type: { type: String, required: true },
    app_config: appConfigSchema,
    app_version: { type: String, required: true },
    gitInfo: gitInfoSchema,
  },
  { versionKey: false }
);

export default AppDbSchema;
