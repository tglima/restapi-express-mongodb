import { getCurrentDateTime } from '../helpers';

class LogEvent {
  constructor(nm_method) {
    this.nm_method = nm_method;
    this.dt_start = getCurrentDateTime();
    this.dt_finish = null;
    this.was_error = false;
    this.messages = [];
  }

  setDtFinish() {
    this.dt_finish = getCurrentDateTime();
  }
}

export default LogEvent;
