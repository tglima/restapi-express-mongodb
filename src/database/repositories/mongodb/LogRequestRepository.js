import { model } from 'mongoose';
import LogRequestSchema from '../../schemas/mongodb/LogRequestSchema';
import toSchema from './mappers/logRequestMapper';

const dbSchema = model('logRequestModel', LogRequestSchema, 'log_requests');

class LogRequestRepository {
  async saveLogRequest(log_request) {
    try {
      await dbSchema.create(toSchema(log_request));
    } catch (error) {
      console.error(error);
    }
  }
}

export default new LogRequestRepository();
