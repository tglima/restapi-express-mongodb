import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

class LogRequest {
  constructor() {
    this.request_id = uuidv4();
    this.dt_start = moment().toISOString();
    this.dt_finish = null;
    this.url_base = null;
    this.key = null;
    this.input_request = null;
    this.output_resquest = null;
    this.status_code = null;
    this.events = [];
  }
}

export default LogRequest;
