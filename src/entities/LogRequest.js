import { v4 as uuidv4 } from 'uuid';
import { getCurrentDateTime } from '../helpers';

class LogRequest {
  constructor() {
    this.request_id = uuidv4();
    this.dt_start = getCurrentDateTime();
    this.dt_finish = null;
    this.url_base = null;
    this.key = null;
    this.input_request = null;
    this.output_resquest = null;
    this.status_code = null;
    this.events = [];
  }

  setDtFinish() {
    this.dt_finish = getCurrentDateTime();
  }
}

export default LogRequest;
