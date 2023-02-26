import ReturnDTO from '../DTOs/ReturnDTO';
import Customer from '../models/CustomerModel';
import Constants from '../utils/constants.util';
import util from '../utils/util';
import customerValidator from '../validators/customer.validator';
import validator from '../validators/validator';

async function findById(req) {
  const idCustomer = req.params.id;

  if (!validator.hasValue(idCustomer)) {
    return new ReturnDTO(400, false, 'id Não informado!');
  }

  const resultFind = await Customer.findByIdCustomer(idCustomer);

  if (!resultFind.wasSuccess) {
    return new ReturnDTO(500, false, Constants.MsgStatus500, resultFind.error);
  }

  if (resultFind.jsonBody === undefined) {
    return new ReturnDTO(404, false, Constants.MsgStatus404);
  }

  return new ReturnDTO(200, true, resultFind.jsonBody);
}

async function findByNuDocument(req) {
  const { nuDocument } = req.params;

  if (!validator.hasValue(nuDocument)) {
    return new ReturnDTO(400, false, 'nuDocument não informado!');
  }

  const resultFind = await Customer.findByNuDocument(nuDocument);

  if (!resultFind.wasSuccess) {
    return new ReturnDTO(500, false, Constants.MsgStatus500, resultFind.error);
  }

  if (resultFind.jsonBody === undefined) {
    return new ReturnDTO(404, false, Constants.MsgStatus404);
  }

  return new ReturnDTO(200, true, resultFind.jsonBody);
}

async function saveCustomer(req) {
  let returnValidate = new ReturnDTO(0, true, []);
  const customer = req.body;

  const returnGetUserData = await util.getUserDataReq(req);
  const userDataReq = returnGetUserData.jsonBody;
  customer.idUserRegister = userDataReq.idUserRegister;
  customer.idLastUserEdit = userDataReq.idUserRegister;

  returnValidate = await customerValidator.validateSaveCustomer(customer);

  if (!returnValidate.wasSuccess) {
    return new ReturnDTO(
      400,
      false,
      JSON.parse(JSON.stringify(returnValidate.jsonBody))
    );
  }

  const resultFind = await Customer.findByNuDocument(customer.nuDocument);

  if (!resultFind.wasSuccess) {
    return new ReturnDTO(500, false, undefined, resultFind.error);
  }

  if (validator.hasValue(resultFind.jsonBody)) {
    returnValidate.jsonBody.push(Constants.MsgStatus400);
    return new ReturnDTO(
      400,
      false,
      JSON.parse(JSON.stringify(returnValidate.jsonBody))
    );
  }

  const resultSave = await Customer.saveNew(customer);

  if (!resultSave.wasSuccess) {
    return new ReturnDTO(500, false, undefined, resultSave.error);
  }

  return new ReturnDTO(201, true, resultSave.jsonBody);
}

async function updateCustomer(req) {
  const idCustomer = req.params.id;
  const customer = req.body;
  customer.id = idCustomer;

  if (!validator.hasValue(idCustomer)) {
    return new ReturnDTO(400, false, Constants.MsgRequiredId);
  }

  const returnValidate = await customerValidator.validateSaveCustomer(customer);

  if (!returnValidate.wasSuccess) {
    return new ReturnDTO(
      400,
      false,
      JSON.parse(JSON.stringify(returnValidate.jsonBody))
    );
  }

  const resultFind = await Customer.findByIdCustomer(idCustomer);

  if (!resultFind.wasSuccess) {
    if (!resultFind.wasSuccess) {
      return new ReturnDTO(
        500,
        false,
        Constants.MsgStatus500,
        resultFind.error
      );
    }
  }

  if (resultFind.jsonBody === undefined) {
    return new ReturnDTO(400, false, Constants.MsgStatus400);
  }

  const resultFindDocument = await Customer.findByNuDocument(
    customer.nuDocument
  );

  if (!resultFindDocument.wasSuccess) {
    return new ReturnDTO(
      500,
      false,
      Constants.MsgStatus500,
      resultFindDocument.error
    );
  }

  if (
    resultFindDocument.jsonBody !== undefined &&
    resultFindDocument.jsonBody.id !== customer.id
  ) {
    return new ReturnDTO(400, false, Constants.MsgErrorDocDuplicate);
  }

  const returnGetUserData = await util.getUserDataReq(req);
  const userDataReq = returnGetUserData.jsonBody;
  customer.idLastUserEdit = userDataReq.idUserRegister;

  const resultUpdate = await Customer.updateCustomer(customer);

  if (!resultUpdate.wasSuccess) {
    return new ReturnDTO(
      500,
      false,
      Constants.MsgStatus500,
      resultUpdate.error
    );
  }

  return new ReturnDTO(200, true, resultUpdate.jsonBody);
}

class CustomerController {
  async findById(req, res) {
    const dtStart = new Date().toJSON();
    const response = await findById(req);
    await util.saveLogDB(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }

  async findByNuDocument(req, res) {
    const dtStart = new Date().toJSON();
    const response = await findByNuDocument(req);
    await util.saveLogDB(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }

  async saveCustomer(req, res) {
    const dtStart = new Date().toJSON();
    const response = await saveCustomer(req);
    await util.saveLogDB(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }

  async updateCustomer(req, res) {
    const dtStart = new Date().toJSON();
    const response = await updateCustomer(req);
    await util.saveLogDB(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }
}

export default new CustomerController();
