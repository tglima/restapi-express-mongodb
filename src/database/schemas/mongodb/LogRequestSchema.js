import { Schema } from 'mongoose';

const logEventSchema = new Schema(
  {
    nm_method: { type: String, required: true },
    dt_start: { type: Date, required: true },
    dt_finish: { type: Date },
    was_error: { type: Boolean, default: false, required: true },
    messages: [String],
  },
  { _id: false }
);

const LogRequestSchema = new Schema(
  {
    request_id: { type: String, required: true },
    dt_start: { type: Date, required: true },
    dt_finish: { type: Date, default: Date.now, required: true },
    url_base: { type: String, required: true },
    key: { type: String },
    input_request: { type: String, required: true },
    output_resquest: { type: String, required: true },
    status_code: { type: Number, required: true },
    events: [logEventSchema],
  },
  { versionKey: false }
);

export default LogRequestSchema;
