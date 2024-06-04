/* eslint-disable no-underscore-dangle */
import { model } from 'mongoose';
import AppDbSchema from '../../schemas/mongodb/AppDbSchema';
import getAppConfig from './operations/appOperations';
import AppException from '../../../entities/AppException';

const appDbSchema = model('appModel', AppDbSchema, 'apps');

class AppRepository {
  async getAppConfigById(id) {
    const appDB = await appDbSchema.findOne({ app_id: id });

    if (!appDB) {
      throw new AppException('', '');
    }

    return getAppConfig(appDB);
  }
}

export default new AppRepository();
