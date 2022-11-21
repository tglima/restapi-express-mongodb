const productModel = require('../models/Product');
const constant = require('../helpers/constants');

exports.findAll = async () => {

  const response = {
    statusCode: 200, success: true, jsonBody: null,
  };

  const resultFind = await productModel.findAllProducts();

  if (!resultFind.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  if (resultFind.products === undefined || resultFind.products.length < 1) {

    return constant.RESULT_DEF_ERROR_404;

  }

  response.jsonBody = resultFind.products;
  return response;

};

exports.findById = async (req) => {

  const response = {
    statusCode: 200, success: true, jsonBody: null,
  };

  const { id } = req.params;

  if (id === null || id === undefined) {

    return constant.RESULT_DEF_ERROR_400;

  }

  const resultFind = await productModel.findProductById(id);

  if (!resultFind.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  if (resultFind.product === undefined) {

    return constant.RESULT_DEF_ERROR_404;

  }

  response.jsonBody = resultFind.product;
  return response;

};