import { model, Schema } from 'mongoose';
import ReturnDTO from '../DTOs/ReturnDTO';
import Config from '../utils/config.util';

const schema = new Schema(
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
  { versionKey: false }
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

const dbModel = model('orders', schema, 'orders');

function setDateExpirationOrder(dtStart) {
  const dtFinish = new Date(dtStart);
  dtFinish.setFullYear(
    dtFinish.getFullYear() + Config.getYearsValidateProduct()
  );
  return dtFinish;
}

class Order {
  async saveNew(order) {
    const returnDTO = new ReturnDTO(0, false, undefined);
    const newOrder = order;
    newOrder.dtFinish = setDateExpirationOrder(order.dtStart);

    try {
      returnDTO.jsonBody = await dbModel.create(newOrder);
      returnDTO.wasSuccess = true;
      returnDTO.jsonBody =
        returnDTO.jsonBody === null ? undefined : returnDTO.jsonBody;
    } catch (error) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody = undefined;
      returnDTO.error = error;
    }

    return returnDTO;
  }

  async updateOrder(order) {
    const returnDTO = new ReturnDTO(0, false, undefined);
    const orderUpdated = order;
    orderUpdated.dtFinish = setDateExpirationOrder(order.dtStart);

    try {
      returnDTO.jsonBody = await dbModel.findOneAndUpdate(
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
        }
      );
      returnDTO.jsonBody =
        returnDTO.jsonBody === null ? undefined : returnDTO.jsonBody;
      returnDTO.wasSuccess = true;
    } catch (error) {
      returnDTO.jsonBody = undefined;
      returnDTO.wasSuccess = false;
      returnDTO.error = error;
    }

    return returnDTO;
  }

  async cancelOrderByIdOrder(idOrder, idLastUserEdit) {
    const returnDTO = new ReturnDTO(0, false, undefined);

    try {
      returnDTO.jsonBody = await dbModel.findOneAndUpdate(
        { _id: idOrder },
        {
          dtFinish: new Date().toJSON(),
          idLastUserEdit: `${idLastUserEdit}`,
          dtLastEdit: new Date().toJSON(),
          isActive: false,
        },
        {
          new: true,
        }
      );

      returnDTO.wasSuccess = true;
      returnDTO.jsonBody =
        returnDTO.jsonBody === null ? undefined : returnDTO.jsonBody;
    } catch (error) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody = undefined;
      returnDTO.error = error;
    }

    return returnDTO;
  }

  async findOrderByIdCustomer(idCustomer) {
    const returnDTO = new ReturnDTO(0, false, undefined);

    try {
      returnDTO.jsonBody = await dbModel.findOne({
        idCustomer: `${idCustomer}`,
        isActive: true,
      });
      returnDTO.wasSuccess = true;
      returnDTO.jsonBody =
        returnDTO.jsonBody === null ? undefined : returnDTO.jsonBody;
    } catch (error) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody = undefined;
      returnDTO.error = error;
    }

    return returnDTO;
  }

  async findOrderByIdOrder(idOrder) {
    const returnDTO = new ReturnDTO(0, false, undefined);

    try {
      returnDTO.jsonBody = await dbModel.findOne({
        _id: idOrder,
        isActive: true,
      });
      returnDTO.jsonBody =
        returnDTO.order === null ? undefined : returnDTO.jsonBody;
      returnDTO.wasSuccess = true;
    } catch (error) {
      returnDTO.jsonBody = undefined;
      returnDTO.wasSuccess = false;
      returnDTO.error = error;
    }

    return returnDTO;
  }
}

export default new Order();
