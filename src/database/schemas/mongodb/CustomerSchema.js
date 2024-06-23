import { Schema } from 'mongoose';
import { getCurrentDateTime } from '../../../helpers';
import { GENDERS } from '../../../constants/entitiesConstants';

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: GENDERS, required: true },
    dt_birth: { type: Date, required: true },
    nu_document: { type: String, required: true, unique: true },
    email: { type: String },
    nu_phone: { type: String },
    user_register: { type: String, required: true },
    last_user_edit: { type: String, required: true },
    dt_register: { type: Date, default: getCurrentDateTime() },
    dt_last_edit: { type: Date, default: getCurrentDateTime() },
    is_active: { type: Boolean, default: true },
  },
  { versionKey: false }
);

export default CustomerSchema;
