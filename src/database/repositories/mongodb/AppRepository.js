/* eslint-disable no-underscore-dangle */
import { model } from 'mongoose';
import AppSchema from '../../schemas/mongodb/AppSchema';
import getAppConfig from './operations/appOperations';
import AppException from '../../../entities/AppException';
import { APP_CONFIG_ERROR } from '../../../constants/errorMessages';

const appSchema = model('appModel', AppSchema, 'apps');

class AppRepository {
  async getAppConfigById(id) {
    const appDb = await appSchema.findOne({ app_id: id });

    if (!appDb) {
      throw new AppException('AppRepository.getAppConfigById', APP_CONFIG_ERROR);
    }

    return getAppConfig(appDb);
  }
}

export default new AppRepository();
