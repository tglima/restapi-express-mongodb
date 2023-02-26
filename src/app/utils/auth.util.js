import ReturnDTO from '../DTOs/ReturnDTO';
import controlAccess from '../models/UrlAcessControlModel';
import Config from './config.util';
import Constants from './constants.util';
import util from './util';

async function checkPermissionUserReq(req) {
  const result = await util.getUserDataReq(req);

  if (!result.wasSuccess) {
    return false;
  }

  const userDataReq = result.jsonBody;

  if (userDataReq.idRole === Config.getIdRoleSuperUser()) {
    return true;
  }

  let urlBase = req.originalUrl;

  if (req.originalUrl.includes('=')) {
    const array = req.originalUrl.split('=');
    urlBase = `${array[0]}`;
  }

  urlBase = urlBase.replace(`${Config.getUrlBaseApi()}`, '');

  const resultFindAccess = await controlAccess.findByUrlBase(urlBase);

  if (!resultFindAccess.wasSuccess || resultFindAccess.jsonBody === undefined) {
    return false;
  }

  const accessControl = resultFindAccess.jsonBody;

  switch (req.method.toString().toUpperCase()) {
    case 'GET':
      return accessControl.read.idRolesAllowed.includes(userDataReq.idRole);
    case 'POST':
      return accessControl.post.idRolesAllowed.includes(userDataReq.idRole);
    case 'DELETE':
      return accessControl.delete.idRolesAllowed.includes(userDataReq.idRole);
    case 'PUT':
      return accessControl.update.idRolesAllowed.includes(userDataReq.idRole);
    default:
      return false;
  }
}

class AuthUtil {
  async validateAuthReq(req) {
    const dtStart = new Date().toJSON();
    const mustContinue = await checkPermissionUserReq(req);

    if (!mustContinue) {
      await util.saveLogDB(
        req,
        new ReturnDTO(401, false, Constants.MsgStatus401Alt),
        dtStart
      );
    }
    return mustContinue;
  }
}

export default new AuthUtil();
