/* eslint-disable no-underscore-dangle */

export default function toSchema(logRequest) {
  return {
    request_id: logRequest.request_id,
    dt_start: logRequest.dt_start,
    url_base: logRequest.url_base,
    key: logRequest.key,
    input_request: JSON.stringify(logRequest.input_request),
    output_resquest: JSON.stringify(logRequest.output_resquest),
    status_code: logRequest.status_code,
    events: logRequest.events,
  };
}
