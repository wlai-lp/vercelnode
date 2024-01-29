module.exports = async (req, res) => {
  const axios = require("axios");
  const userAgent = req.headers['user-agent'];
  console.log("hello " + userAgent);
  console.log("url host = " + req.headers.host);
  console.log("url = " + req.url);
  console.log("protocol = " + req.protocol);

  const fullUrl = `${req.connection.encrypted ? 'https' : 'http'}://${req.headers.host}${req.url}`;
  console.log(fullUrl)

  // invoke another serverless 1 serverless
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${req.connection.encrypted ? 'https' : 'http'}://${req.headers.host}/api/getjwt`,
    headers: {},
  };

  const result = await axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });

  res.status(200).json(result);
};
