import ReturnDTO from '../DTOs/ReturnDTO';
import Product from '../models/ProductModel';
import Constants from '../utils/constants.util';
import util from '../utils/util';
import validator from '../validators/validator';

async function findAll() {
  const resultFind = await Product.findAllProducts();

  if (!resultFind.wasSuccess) {
    return new ReturnDTO(500, false, Constants.MsgStatus500, resultFind.error);
  }

  if (resultFind.jsonBody === undefined || resultFind.jsonBody.length < 1) {
    return new ReturnDTO(404, false, Constants.MsgStatus404);
  }

  return new ReturnDTO(200, true, resultFind.jsonBody);
}

async function findById(req) {
  const { id } = req.params;

  if (!validator.hasValue(id)) {
    return new ReturnDTO(400, false, 'id Não informado!');
  }

  const resultFind = await Product.findProductById(id);

  if (!resultFind.wasSuccess) {
    return new ReturnDTO(500, false, Constants.MsgStatus500, resultFind.error);
  }

  if (resultFind.jsonBody === undefined) {
    return new ReturnDTO(404, false, Constants.MsgStatus404);
  }

  return new ReturnDTO(200, true, resultFind.jsonBody);
}

class ProductController {
  async findAll(req, res) {
    const dtStart = new Date().toJSON();
    const response = await findAll();
    await util.saveLogDB(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }

  async findById(req, res) {
    const dtStart = new Date().toJSON();
    const response = await findById(req);
    await util.saveLogDB(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }
}

export default new ProductController();
