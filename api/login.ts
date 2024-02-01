import type { VercelRequest, VercelResponse } from '@vercel/node';

import axios from 'axios';

export default async (req: VercelRequest, res: VercelResponse) => {
  // this is the source siteid
  //siteid, username, password
  console.log(req.body.siteid);
  console.log('url host = ' + req.headers.host);
  console.log(JSON.stringify(req.body));
  const data = JSON.stringify(req.body);

  let htmlContent = "";

  const htmlContent_success = `  
  <button type="submit" class="btn btn-primary"  hx-post="/api/logindest" hx-swap="outerHTML">Login to Destination Site</button>
`;

const htmlContent_failed = `
  
  <button type="submit" class="btn btn-primary"  hx-post="/api/login" hx-swap="outerHTML">Login to Source Site</button>
  
  <div role="alert" class="alert alert-info mt-6">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>Login failed.</span>
  </div>
`;
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

  try {
    console.log('start send login request');
    const response = await axios.request(config);
    console.log('done send login request');
    console.log(JSON.stringify(response.data.bearer));
    const token = response.data.bearer;
    // if success then we send the good content
    // if we have token then render the button for source loging
    htmlContent = htmlContent_success;

    res.setHeader('Content-Type', 'text/html');
    //   res.setHeader('Set-Cookie', `LPcloneSession=${sessionId}`);
    // res.setHeader('Set-Cookie', `LPsoucetoken=${token};`);
    res.setHeader('Set-Cookie', [
      `LPsourcetoken=${token}; Max-Age=172800`,
      `LPsourcesiteid=${req.body.siteid}; Max-Age=172800`,
    ]);

  } catch (error) {
    console.error(error);
    htmlContent = htmlContent_failed
    // res.status(500).json({ error: 'Internal Server Error2' });
  }
  res.status(200).send(htmlContent);

  // const { name = 'World' } = query;

  // return res.json({
  //   message: `Hello ${name}!`,
  // });
};
