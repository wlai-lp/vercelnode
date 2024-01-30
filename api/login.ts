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
  <button hx-post="/api/logindest" hx-swap="outerHTML" 
          class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Login to Destination Site
  </button>
`;

const htmlContent_failed = `
  <button hx-post="/api/login" hx-swap="outerHTML" 
          class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Login to Source Site
  </button>
  <div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span class="sr-only">Info</span>
    <div>
      <span class="font-medium">Login failed!</span> Please try submitting again.
    </div>
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
