import app from './app';
import config from './config';

// server config
const { port } = config;

app
  .listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
  })
  // if port in use
  .on('error', function (err) {
    console.log(err);
  });
