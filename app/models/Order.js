const mongoose = require('mongoose');
const appConfig = require('../config/app.config');

const schema = new mongoose.Schema(
  {
    idCustomer: { type: String, required: true },
    idProduct: { type: String, required: true },
    nmProduct: { type: String, required: true },
    vlMonthPrice: { type: Number, min: 0, required: true },
    dtStart: { type: Date, default: new Date().toJSON() },
    dtFinish: { type: Date, default: new Date().toJSON() },
    dtRegister: { type: Date, default: new Date().toJSON() },
    dtLastEdit: { type: Date, default: new Date().toJSON() },
    idUserRegister: { type: String, required: true },
    idLastUserEdit: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false },
);

schema.methods.toJSON = function toJSON() {

  const orderJSON = {};
  const obj = this.toObject();

  // eslint-disable-next-line no-underscore-dangle
  orderJSON.id = obj._id;
  orderJSON.idCustomer = obj.idCustomer;
  orderJSON.idProduct = obj.idProduct;
  orderJSON.nmProduct = obj.nmProduct;
  orderJSON.vlMonthPrice = obj.vlMonthPrice;
  orderJSON.dtStart = obj.dtStart;
  orderJSON.dtFinish = obj.dtFinish;
  return orderJSON;

};

const Order = mongoose.model('orders', schema, 'orders');

exports.saveNew = async (order) => {

  const result = { wasSuccess: false, order: undefined, error: undefined };
  const newOrder = order;
  newOrder.dtFinish = new Date(order.dtStart);
  newOrder.dtFinish.setFullYear(newOrder.dtFinish.getFullYear() + appConfig.nuYearsValProduct);

  try {

    result.order = await Order.create(newOrder);
    result.order = result.order === null ? undefined : result.order;
    result.wasSuccess = true;

  } catch (error) {

    result.order = undefined;
    result.wasSuccess = false;
    result.error = error;

  }

  return result;

};

exports.updateOrder = async (order) => {

  const result = { wasSuccess: false, order: undefined, error: undefined };

  const orderUpdated = order;
  orderUpdated.dtFinish = new Date(orderUpdated.dtStart);
  orderUpdated.dtFinish.setFullYear(
    orderUpdated.dtFinish.getFullYear() + appConfig.nuYearsValProduct,
  );

  try {

    result.order = await Order.findOneAndUpdate(
      { _id: orderUpdated.id },
      {
        idProduct: orderUpdated.idProduct,
        nmProduct: orderUpdated.nmProduct,
        vlMonthPrice: orderUpdated.vlMonthPrice,
        idLastUserEdit: orderUpdated.idLastUserEdit,
        dtStart: orderUpdated.dtStart,
        dtFinish: orderUpdated.dtFinish,
        dtLastEdit: new Date().toJSON(),
      },
      {
        new: true,
      },
    );
    result.order = result.order === null ? undefined : result.order;
    result.wasSuccess = true;

  } catch (error) {

    result.order = undefined;
    result.wasSuccess = false;
    result.error = error;

  }

  return result;

};

exports.cancelOrderByIdOrder = async (idOrder, idLastUserEdit) => {

  const result = { wasSuccess: false, order: undefined, error: undefined };
  try {

    result.order = await Order.findOneAndUpdate(
      { _id: idOrder },
      {
        dtFinish: new Date().toJSON(),
        idLastUserEdit: `${idLastUserEdit}`,
        dtLastEdit: new Date().toJSON(),
        isActive: false,
      },
      {
        new: true,
      },
    );

    result.order = result.order === null ? undefined : result.order;
    result.wasSuccess = true;

  } catch (error) {

    result.order = undefined;
    result.wasSuccess = false;
    result.error = error;

  }

  return result;

};

exports.findOrderByIdCustomer = async (idCustomer) => {

  const result = { wasSuccess: false, order: undefined, error: undefined };

  try {

    result.order = await Order.findOne({ idCustomer: `${idCustomer}`, isActive: true });
    result.order = result.order === null ? undefined : result.order;
    result.wasSuccess = true;

  } catch (error) {

    result.order = undefined;
    result.wasSuccess = false;
    result.error = error;

  }

  return result;

};

exports.findOrderByIdOrder = async (idOrder) => {

  const result = { wasSuccess: false, order: undefined, error: undefined };

  try {

    result.order = await Order.findOne({ _id: idOrder, isActive: true });
    result.order = result.order === null ? undefined : result.order;
    result.wasSuccess = true;

  } catch (error) {

    result.order = undefined;
    result.wasSuccess = false;
    result.error = error;

  }

  return result;

};