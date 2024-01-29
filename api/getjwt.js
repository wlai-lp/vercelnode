module.exports = async (req, res) => {
    const axios = require("axios");
    const userAgent = req.headers['user-agent'];
    console.log("hello " + userAgent);
    console.log("url host = " + req.headers.host);
    console.log("url = " + req.url);
  
    console.log("api key is " + process.env.API_KEY);
  
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://va.idp.liveperson.net/api/account/90412079/signup",
      headers: {},
    };
  
    const jwt = await axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        return response.data
      })
      .catch((error) => {
        console.log(error);
      });
  
    res.status(200).json(jwt);
  };
  