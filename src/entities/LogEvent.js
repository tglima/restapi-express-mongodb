import moment from 'moment';

class LogEvent {
  constructor(nm_method) {
    this.nm_method = nm_method;
    this.dt_start = moment().toISOString();
    this.dt_finish = null;
    this.was_error = false;
    this.messages = [];
  }

  setDtFinish() {
    this.dt_finish = moment().toISOString();
  }
}

export default LogEvent;
