const Product = require('../models/Product');

exports.FindAll = async () => {
  const response = {
    statusCode: 404, success: false, jsonBody: 'Not Found',
  };

  try {
    const products = await Product.find({ isActive: true });

    if (products === undefined || products === null) {
      return response;
    }

    response.statusCode = 200;
    response.success = true;
    response.jsonBody = products;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    response.statusCode = 500;
    response.success = false;
    response.jsonBody = 'Internal Server Error';
  }

  return response;
};

exports.FindById = async (req) => {
  const response = {
    statusCode: 404, success: false, jsonBody: 'Not Found',
  };

  const { id } = req.params;

  if (id === null || id === undefined) {
    response.statusCode = 400;
    response.success = false;
    response.jsonBody = 'Uninformed id';
    return response;
  }

  try {
    const product = await Product.findById({ _id: id, isActive: true });

    if (product === undefined || product === null) {
      return response;
    }

    response.statusCode = 200;
    response.success = true;
    response.jsonBody = product;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    response.statusCode = 500;
    response.success = false;
    response.jsonBody = 'Internal Server Error';
  }

  return response;
};

exports.SaveNew = async (req) => {
  const response = {
    statusCode: 400, success: false, jsonBody: 'Bad Request',
  };

  const { product } = req.body;

  if (product === undefined || product === null) {
    return response;
  }

  try {
    const productDb = await Product.create(product);

    if (productDb === undefined || productDb === null) {
      return response;
    }

    response.statusCode = 201;
    response.success = true;
    response.jsonBody = { productDb };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    response.statusCode = 500;
    response.success = false;
    response.jsonBody = 'Internal Server Error';
  }

  return response;
};