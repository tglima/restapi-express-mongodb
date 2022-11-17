const productModel = require('../models/Product');
const constant = require('../helpers/constants');

exports.findAll = async () => {

  const response = {
    statusCode: 200, success: true, jsonBody: null,
  };

  const result = await productModel.findAllProducts();

  if (!result.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  if (result.products === undefined || result.products === null || result.products.length < 1) {

    return constant.RESULT_DEF_ERROR_404;

  }

  response.jsonBody = result.products;
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

  const result = await productModel.findProductById(id);

  if (!result.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  if (result.product === undefined || result.product === null) {

    return constant.RESULT_DEF_ERROR_404;

  }

  response.jsonBody = result.product;
  return response;

};