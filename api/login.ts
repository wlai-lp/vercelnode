import type { VercelRequest, VercelResponse } from '@vercel/node';

import axios from 'axios';

export default async (req: VercelRequest, res: VercelResponse) => {
  // this is the source siteid
  //siteid, username, password
  console.log(req.body.siteid);
  console.log("url host = " + req.headers.host);
  console.log(JSON.stringify(req.body));
  const data = JSON.stringify(req.body);

  // login and get auth token
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://va.agentvep.liveperson.net/api/account/${req.body.siteid}/login?v=1.3`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: data, //JSON.stringify(req.body)
  };

  let token = '';
  try {
    console.log('start send login request');
    const response = await axios.request(config);
    console.log('done send login request');
    console.log(JSON.stringify(response.data.bearer));
    token = response.data.bearer;
    // res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error2' });
  }

  // if we have token then render the button for source loging
  const htmlContent = `
      <button hx-post="/api/logindest" hx-swap="outerHTML" 
              class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              Login to Destination Site
      </button>
  `;
  // todo: generate a session id
  const sessionId = 'adflk23423';
  res.setHeader('Content-Type', 'text/html');
  //   res.setHeader('Set-Cookie', `LPcloneSession=${sessionId}`);
  // res.setHeader('Set-Cookie', `LPsoucetoken=${token};`);
  res.setHeader('Set-Cookie', [
    `LPsourcetoken=${token}; Max-Age=3600`,
    `LPsourcesiteid=${req.body.siteid}; Max-Age=3600`,
  ]);

  res.status(200).send(htmlContent);

  // const { name = 'World' } = query;

  // return res.json({
  //   message: `Hello ${name}!`,
  // });
};
