import { model } from 'mongoose';
import ProductSchema from '../../schemas/mongodb/ProductSchema';
import toEntity from './mappers/productMapper';
import LogEvent from '../../../entities/LogEvent';

const dbSchema = model('productModel', ProductSchema, 'products');

class ProducRepository {
  async findAll(logRequest) {
    const logEvent = new LogEvent('ProductRepository.findAll');

    const products = [];
    const resultDb = await dbSchema.find({ is_active: true });

    if (resultDb) {
      resultDb.forEach((product) => {
        products.push(toEntity(product));
      });
    }

    logEvent.messages.push(`products.length: ${products.length}`);

    logEvent.setDtFinish();
    logRequest.events.push(logEvent);
    return products;
  }

  async findByIdProduct(logRequest, id_product) {
    const logEvent = new LogEvent('ProductRepository.findByIdProduct');
    const resultDb = await dbSchema.findOne({ id_product, is_active: true });
    const product = resultDb ? toEntity(resultDb) : undefined;

    logEvent.messages.push(`product: ${product}`);

    logEvent.setDtFinish();
    logRequest.events.push(logEvent);
    return product;
  }
}

export default new ProducRepository();
