import test from '../model/test';

const get = async (req, res) => {
  const data = await test();

  res.send(data);
};

export default get;
