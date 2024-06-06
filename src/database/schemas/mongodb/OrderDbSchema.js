import { Schema } from 'mongoose';
import { getCurrentDateTime } from '../../../helpers';
import ProductSchema from './ProductSchema';

const OrderSchema = new Schema({
  id_customer: { type: String, required: true },
  product: ProductSchema,
  dt_register: { type: Date, default: getCurrentDateTime() },
  dt_last_edit: { type: Date, default: getCurrentDateTime() },
  user_register: { type: String, required: true },
  last_user_edit: { type: String, required: true },
  dtStart: { type: Date, default: getCurrentDateTime() },
  dtFinish: { type: Date, required: true },
  payment_status: { type: String, enum: ['APPROVED', 'CANCELLED', 'PENDING'], required: true },
  is_active: { type: Boolean, default: true },
});

export default OrderSchema;
