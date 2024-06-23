import { Schema } from 'mongoose';
import { getCurrentDateTime } from '../../../helpers';
import ProductSchema from './ProductSchema';
import { PAYMENT_STATUS } from '../../../constants/entitiesConstants';

const OrderSchema = new Schema({
  id_customer: { type: String, required: true },
  product: ProductSchema,
  dt_register: { type: Date, default: getCurrentDateTime() },
  dt_last_edit: { type: Date, default: getCurrentDateTime() },
  user_register: { type: String, required: true },
  last_user_edit: { type: String, required: true },
  dt_start: { type: Date, default: getCurrentDateTime() },
  dt_finish: { type: Date, required: true },
  payment_status: { type: String, enum: PAYMENT_STATUS, required: true },
  is_active: { type: Boolean, default: true },
});

export default OrderSchema;
