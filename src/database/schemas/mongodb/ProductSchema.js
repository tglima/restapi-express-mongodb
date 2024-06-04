import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    id_product: { type: Number, required: true, unique: true, set: (value) => Math.round(value) },
    nm_product: { type: String, required: true },
    vl_month_price: { type: Number, required: true },
    nm_videoQuality: { type: String, required: true },
    nm_resolution: { type: String, required: true },
    qt_simultaneous_screens: {
      type: Number,
      required: true,
      set: (value) => Math.round(value),
    },
    is_active: { type: Boolean, required: true },
  },
  { versionKey: false }
);

export default ProductSchema;
