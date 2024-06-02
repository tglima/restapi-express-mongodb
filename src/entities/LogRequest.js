import moment from 'moment';

class LogRequest {
  constructor(request_id) {
    this.request_id = request_id;
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
