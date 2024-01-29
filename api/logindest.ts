import type { VercelRequest, VercelResponse } from '@vercel/node';

import axios from 'axios';

const data = JSON.stringify({
  username: 'wlai@liveperson.com',
  password: 'HFR6aer6mju9ukr*ukf',
});

export default async (req: VercelRequest, res: VercelResponse) => {
  // this is the source siteid
  //siteid, username, password
  console.log(req.body.username);

  // login and get auth token
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://va.agentvep.liveperson.net/api/account/90412079/login?v=1.3',
    headers: {
      'x-api-key': '23EKeQptjA7PA6ETYjpyUqVOg6p9zfzB',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie:
        'session_id=87ad1bc0-1d6e-4e4f-8aef-e3b1fcfe914b; idpLastDomain=va-e.c.liveperson.net; idpLastSiteId=90412079',
    },
    data: data,
  };

  let token = '';
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data.bearer));
    token = response.data.bearer;
    // res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  // if we have tokent then render the rest
  const htmlContent = `
      <button hx-post="/destlogin" hx-swap="outerHTML"
              class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
        Login htmx one
      </button>
  `;
  // todo: generate a session id
  res.setHeader('Content-Type', 'text/html');
  //   res.setHeader('Set-Cookie', `LPcloneSession=${sessionId}`);
  res.setHeader('Set-Cookie', [
    `LPdesttoken=${token}; Max-Age=3600`,
    `LPdestiteid=${req.body.siteid}; Max-Age=3600`,
  ]);

  res.status(200).send(htmlContent);

  // const { name = 'World' } = query;

  // return res.json({
  //   message: `Hello ${name}!`,
  // });
};
