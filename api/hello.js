module.exports = async (req, res) => {
  const axios = require("axios");

  console.log("hello " + req);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://va.idp.liveperson.net/api/account/90412079/signup",
    headers: {},
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  res.status(200).json({ message: "Hello, World1223!!!!" });
};
