export default {
  environment: process.env.NODE_ENV || 'development',
  client_origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  port: process.env.PORT || 8000
};
