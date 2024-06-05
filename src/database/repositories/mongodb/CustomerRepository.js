/* eslint-disable no-underscore-dangle */
import { model } from 'mongoose';
import LogEvent from '../../../entities/LogEvent';
import CustomerSchema from '../../schemas/mongodb/CustomerSchema';
import { toEntity, toSchema } from './mappers/customerMapper';

const dbSchema = model('customer', CustomerSchema, 'customers');

class CustomerRepository {
  async findByNuDocument(logRequest, nuDocument) {
    const logEvent = new LogEvent('CustomerRepository.findByNuDocument');
    logEvent.messages.push(`nu_document: ${nuDocument}`);

    let resultDb = await dbSchema.findOne({
      is_active: true,
      nu_document: nuDocument,
    });

    resultDb = !resultDb ? null : toEntity(resultDb);
    logEvent.messages.push(`customer: ${resultDb}`);

    logEvent.setDtFinish();
    logRequest.events.push(logEvent);

    return resultDb;
  }

  async findById(logRequest, id) {
    const logEvent = new LogEvent('CustomerRepository.findById');
    logEvent.messages.push(`id: ${id}`);

    let resultDb = await dbSchema.findOne({
      is_active: true,
      _id: id,
    });

    resultDb = !resultDb ? null : toEntity(resultDb);
    logEvent.messages.push(`customer: ${resultDb}`);

    logEvent.setDtFinish();
    logRequest.events.push(logEvent);

    return resultDb;
  }

  async save(logRequest, customer) {
    const logEvent = new LogEvent('CustomerRepository.save');
    logEvent.messages.push(`customer: ${customer}`);

    const resultDb = await dbSchema.create(toSchema(customer));
    const id = !resultDb ? null : resultDb._id.toString();

    logEvent.messages.push(`id: ${id}`);

    logEvent.setDtFinish();
    logRequest.events.push(logEvent);
    return id;
  }

  async update(logRequest, customer) {
    const logEvent = new LogEvent('CustomerRepository.update');
    logEvent.messages.push(`customer: ${customer}`);

    const _id = customer.id;
    delete customer.id;
    const resultDb = await dbSchema.findOneAndUpdate({ _id }, customer);

    logEvent.messages.push(`customer: ${resultDb}`);
    const id = !resultDb ? null : resultDb._id.toString();

    logEvent.messages.push(`id: ${id}`);

    logEvent.setDtFinish();
    logRequest.events.push(logEvent);
    return id;
  }
}

export default new CustomerRepository();
