/* eslint-disable no-underscore-dangle */
import { model } from 'mongoose';
import { toEntity, toSchema } from './mappers/orderMapper';
import LogEvent from '../../../entities/LogEvent';
import OrderSchema from '../../schemas/mongodb/OrderDbSchema';
import CustomerRepository from './CustomerRepository';

const dbSchema = model('orderModel', OrderSchema, 'orders');

class OrderRepository {
  async findOrderByIdOrder(logRequest, idOrder) {
    const logEvent = new LogEvent('OrderRepository.findOrderByIdOrder');
    logEvent.messages.push(`idOrder: ${idOrder}`);
    const resultDb = await dbSchema.findOne({ _id: idOrder, is_active: true });
    const order = resultDb ? toEntity(resultDb) : undefined;
    logEvent.messages.push(`order: ${order}`);
    logEvent.setDtFinish();
    logRequest.events.push(logEvent);
    return order;
  }

  async findOrderByIdCustomer(logRequest, idCustomer) {
    const orders = [];
    const logEvent = new LogEvent('OrderRepository.findOrderByIdCustomer');
    logEvent.messages.push(`idCustomer: ${idCustomer}`);
    const resultDb = await dbSchema.find({ id_customer: idCustomer, is_active: true });

    if (resultDb) {
      resultDb.forEach((orderDb) => {
        orders.push(toEntity(orderDb));
      });
    }

    logEvent.messages.push(`orders.length: ${orders.length}`);
    logEvent.setDtFinish();
    logRequest.events.push(logEvent);
    return orders;
  }

  async findOrderByNuDocument(logRequest, nuDocument) {
    const orders = [];
    const logEvent = new LogEvent('OrderRepository.findOrderByNuDocument');
    logEvent.messages.push(`nuDocument: ${nuDocument}`);

    const resultFindCustomer = await CustomerRepository.findByNuDocument(logRequest, nuDocument);

    if (!resultFindCustomer) {
      logEvent.messages.push(`customer: ${resultFindCustomer}`);
      logEvent.setDtFinish();
      logRequest.events.push(logEvent);
      return orders;
    }

    const resultDb = await this.findOrderByIdCustomer(logRequest, resultFindCustomer.id.toString());

    if (resultDb) {
      resultDb.forEach((orderDb) => {
        orders.push(orderDb);
      });
    }

    logEvent.messages.push(`orders.length: ${orders.length}`);
    logEvent.setDtFinish();
    logRequest.events.push(logEvent);
    return orders;
  }

  async saveOrder(logRequest, order) {
    const logEvent = new LogEvent('OrderRepository.saveOrder');
    logEvent.messages.push(`order: ${order}`);
    const resultDb = await dbSchema.create(toSchema(order));
    const id = !resultDb ? null : resultDb._id.toString();
    logEvent.messages.push(`id: ${id}`);
    logEvent.setDtFinish();
    logRequest.events.push(logEvent);
    return id;
  }

  async update(logRequest, order) {
    const logEvent = new LogEvent('OrderRepository.update');
    logEvent.messages.push(`order: ${order}`);

    const _id = order.id;
    delete order.id;
    const resultDb = await dbSchema.findOneAndUpdate({ _id }, order);

    logEvent.messages.push(`order: ${resultDb}`);
    const id = !resultDb ? null : resultDb._id.toString();

    logEvent.messages.push(`id: ${id}`);

    logEvent.setDtFinish();
    logRequest.events.push(logEvent);
    return id;
  }

  async updatePaymentStatus(logRequest, idOrder, paymentStatus) {
    const logEvent = new LogEvent('OrderRepository.updatePaymentStatus');
    logEvent.messages.push(`idOrder: ${idOrder}`);
    logEvent.messages.push(`order: ${paymentStatus}`);

    const resultDb = await dbSchema.findOneAndUpdate({ _id: idOrder }, { payment_status: paymentStatus });

    logEvent.messages.push(`order.payment_status: ${resultDb.payment_status}`);
    const id = !resultDb ? null : resultDb._id.toString();

    logEvent.messages.push(`id: ${id}`);

    logEvent.setDtFinish();
    logRequest.events.push(logEvent);
    return id;
  }
}

export default new OrderRepository();
