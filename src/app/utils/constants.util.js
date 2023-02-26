const dotenv = require('dotenv');

const envMode = process.env.NODE_ENV || this.development;
const path = `./config/env/${envMode}.env`;
dotenv.config({ path });
const qtMinCharMessage = +process.env.QT_MIN_CHAR_MESSAGE || 20;

exports.test = 'test';
exports.development = 'development';
exports.OK = 'OK';
exports.MsgErrorDocDuplicate =
  'O documento informado já pertence a outro cliente!';

exports.MsgStatus201 = 'Registrado com sucesso!';
exports.MsgStatus400 =
  'Ocorreu uma falha/erro na sua requisição. Reveja os dados enviados e tente novamente!';
exports.MsgStatus401 = 'Credenciais inválidas!';
exports.MsgStatus401Alt = 'Usuário sem permissão ou Token inválido!';
exports.MsgStatus404 = 'Item não encontrado!';
exports.MsgStatus429 =
  'Limite de requisicoes ultrapassado, por favor, aguarde.';
exports.MsgStatus500 = 'Erro interno no servidor!';
exports.MsgStatusDeleteSuccess = 'Registro apagado/cancelado com sucesso!';
exports.MsgInvalidName = 'Nome inválido!';
exports.MsgInvalidDate = 'A data informada é inválida!';
exports.MsgInvalidDtBirth = 'A data de nascimento informada é inválida!';
exports.MsgInvalidDtBirthAlt =
  'A data de nascimento informada não corresponde a uma idade válida!';
exports.MsgInvalidGender = 'Sexo inválido!';
exports.MsgInvalidEmail = 'O e-mail informado é inválidos!';
exports.MsgInvalidQtCharMessage = `Obrigatório informar uma mensagem com pelo menos ${qtMinCharMessage} caracteres!`;
exports.MsgInvalidPhone = 'O número de telefone informado é inválido!';
exports.MsgInvalidDDD = 'O número de DDD informado é inválido!';
exports.MsgInvalidDoc = 'O documento informado é inválido!';

exports.MsgNuDocumentUninformed = 'nuDocument Não informado!';
exports.MsgIdCustomerUninformed = 'idCustomer Não informado!';

exports.MsgRequiredId = 'Obrigatório informar o id';
exports.MsgRequiredPhoneHasDDD =
  'Ao informar o DDD é obrigatório informar o número do telefone!';
exports.MsgRequiredDDDHasPhone =
  'Ao informar o número do telefone é obrigatório informar o DDD!';
exports.MsgRequiredPhoneOrEmail =
  'Obrigatório informar o E-mail, ou DDD e Telefone';
