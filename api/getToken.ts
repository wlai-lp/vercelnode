import type { VercelRequest, VercelResponse } from '@vercel/node';

import axios from 'axios';

const data = JSON.stringify({
    "username": "wlai@liveperson.com",
    "password": "HFR6aer6mju9ukr*ukf"
  });

export default async(req: VercelRequest, res: VercelResponse) => {
// export default async (req: Request, res: Response) => {
  const userAgent = req.headers['user-agent'];
  console.log("hello " + userAgent);
  console.log("url host = " + req.headers.host);
  console.log("url = " + req.url);

  console.log("api key is " + process.env.API_KEY);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://va.agentvep.liveperson.net/api/account/90412079/login?v=1.3',
    headers: { 
      'x-api-key': '23EKeQptjA7PA6ETYjpyUqVOg6p9zfzB', 
      'Content-Type': 'application/json', 
      'Accept': 'application/json', 
      'Cookie': 'session_id=87ad1bc0-1d6e-4e4f-8aef-e3b1fcfe914b; idpLastDomain=va-e.c.liveperson.net; idpLastSiteId=90412079'
    },
    data : data
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
