import type { VercelRequest, VercelResponse } from '@vercel/node';

import axios from 'axios';

export default async (req: VercelRequest, res: VercelResponse) => {
  // this is the source siteid
  //siteid, username, password
  console.log(req.body.username);
  const data = JSON.stringify(req.body);
  
  // const lpSourceSite = req.cookies['LPsoucesiteid'];
  // console.log(lpSourceSite);

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
        Login destination done, redirecting
      </button>
  `;
  // todo: generate a session id
  // Access request parameters
  const { query, body, headers, method } = req;
  query.encrypted
  const compareUrl = `${req.query.encrypted ? 'https' : 'http'}://${req.headers.host}/api/compare`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('HX-Redirect', compareUrl);
  //   res.setHeader('Set-Cookie', `LPcloneSession=${sessionId}`);
  res.setHeader('Set-Cookie', [
    `LPdesttoken=${token}; Max-Age=172800`,
    `LPdestiteid=${req.body.siteid}; Max-Age=172800`,
  ]);

  res.status(200).send(htmlContent);

  // const { name = 'World' } = query;

  // return res.json({
  //   message: `Hello ${name}!`,
  // });
};
