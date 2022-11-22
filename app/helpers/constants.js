exports.HTTP_MSG_ERROR_200 = 'OK';
exports.HTTP_MSG_ERROR_200_DELETE = 'Registro apagado/cancelado com sucesso!';
exports.HTTP_MSG_ERROR_201 = 'Criado com sucesso!';
exports.HTTP_MSG_ERROR_400 = 'Ocorreu uma falha/erro na sua requisição. Reveja os dados enviados e tente novamente!';
exports.HTTP_MSG_ERROR_401 = 'Credenciais inválidas!';
exports.HTTP_MSG_ERROR_401_ALT = 'Usuário sem permissão ou Token inválido!';
exports.HTTP_MSG_ERROR_404 = 'Não encontrado!';
exports.HTTP_MSG_ERROR_500 = 'Erro interno no servidor!';

exports.RESULT_DEF_ERROR_500 = {
  statusCode: 500,
  success: false,
  jsonBody: this.HTTP_MSG_ERROR_500,
  error: undefined,
};

exports.RESULT_DEF_ERROR_400 = {
  statusCode: 400,
  success: false,
  jsonBody: this.HTTP_MSG_ERROR_400,
  error: undefined,
};

exports.RESULT_DEF_ERROR_404 = {
  statusCode: 404,
  success: false,
  jsonBody: this.HTTP_MSG_ERROR_404,
  error: undefined,
};