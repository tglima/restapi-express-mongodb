const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    idUserRegister: { type: String },
    reqHeaders: { type: Object },
    reqParams: { type: Object },
    reqBody: { type: Object },
    reqMethod: { type: String },
    resStatusCode: { type: String },
    resJsonBody: { type: Object },
    error: { type: Object },
    dtStart: { type: Date, default: new Date().toJSON() },
    dtFinish: { type: Date, default: new Date().toJSON() },
  },
  { versionKey: false },
);

const Log = mongoose.model('apiLogs', schema, 'apiLogs');

exports.saveNew = async (log) => {
  const result = { wasSuccess: false, logDB: undefined, error: undefined };

  try {
    result.logDB = await Log.create(log);
    result.logDB = result.logDB === null ? undefined : result.logDB;
    result.wasSuccess = true;
  } catch (error) {
    result.logDB = undefined;
    result.wasSuccess = false;
    result.error = error;
  }

  return result;
};
