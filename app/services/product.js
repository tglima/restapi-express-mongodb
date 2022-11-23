const productModel = require('../models/Product');
const constant = require('../helpers/constants');

exports.findAll = async () => {

  let response = constant.RESULT_DEF_200;

  const resultFind = await productModel.findAllProducts();

  if (!resultFind.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_500;
    response.error = resultFind.error;
    return response;

  }

  if (resultFind.products === undefined || resultFind.products.length < 1) {

    response = constant.RESULT_DEF_ERROR_404;
    return response;

  }

  response.jsonBody = resultFind.products;
  return response;

};

exports.findById = async (req) => {

  let response = constant.RESULT_DEF_200;

  const { id } = req.params;

  if (id === null || id === undefined) {

    response = constant.RESULT_DEF_ERROR_400;
    response.jsonBody = 'id Não informado!';
    return response;

  }

  const resultFind = await productModel.findProductById(id);

  if (!resultFind.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_500;
    response.error = resultFind.error;
    return response;

  }

  if (resultFind.product === undefined) {

    response = constant.RESULT_DEF_ERROR_404;
    return response;

  }

  response.jsonBody = resultFind.product;
  return response;

};