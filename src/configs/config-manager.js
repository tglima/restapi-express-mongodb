export const ENV_MODE = `${process.env.NODE_ENV || 'develop'}`;
export const NU_PORT = +process.env.NU_PORT || 9090;
export const URL_SWAGGER = `${process.env.URL_SWAGGER || `http://localhost:${NU_PORT}/api-docs`}`;
