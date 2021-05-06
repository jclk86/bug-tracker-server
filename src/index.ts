import app from './app';
import config from './config';

const { port } = config;

app
  .listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
  })
  .on('error', function (err) {
    console.log(err);
  });
