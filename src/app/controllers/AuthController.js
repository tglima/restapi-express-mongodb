import ReturnDTO from '../DTOs/ReturnDTO';
import User from '../models/UserModel';
import Constants from '../utils/constants.util';
import jwtUtil from '../utils/jwt.util';
import util from '../utils/util';

async function checkAuthDb(reqBody) {
  const resultFind = await User.findByUsernameAndPass(
    reqBody.username,
    reqBody.password
  );

  if (resultFind.jsonBody === undefined) {
    return new ReturnDTO(401, false, Constants.MsgStatus401);
  }

  if (!resultFind.wasSuccess) {
    return new ReturnDTO(500, false, Constants.MsgStatus500, resultFind.error);
  }

  return new ReturnDTO(
    200,
    true,
    await jwtUtil.generateToken(resultFind.jsonBody)
  );
}

class AuthController {
  async auth(req, res) {
    const dtStart = new Date().toJSON();
    const response = await checkAuthDb(req.body);
    await util.saveLogDB(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }
}

export default new AuthController();
