import app from './app';
import config from './config';

const { port } = config;

Promise.resolve()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running in http://localhost:${port}`);
    });
  })
  .catch((err) => console.error(err));

// The Promise.resolve() method returns a Promise object that is resolved with a given value. If the value is a promise, that promise is returned; if the value is a thenable (i.e. has a "then" method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value. This function flattens nested layers of promise-like objects (e.g. a promise that resolves to a promise that resolves to something) into a single layer.
