import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parse } from 'cookie'

export default (req: VercelRequest, res: VercelResponse) => {

    // const lpSourceSite = req.cookies['LPsoucesiteid'];
    // const lpDestSite = req.cookies['LPdestiteid'];

    // console.log(req.headers.cookie);
    const rawCookieHeader = req.headers.cookie || '';

    // Parse the raw cookie header using the cookie package
    const cookies = parse(rawCookieHeader);
    console.log(cookies['LPsourcetoken']);

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <title>Centered Two Panels</title>
  </head>
  <body class="flex h-screen">
  
    <!-- Container for Centering -->
    <div class="flex mx-auto">
  
      <!-- Left Panel -->
      <div class="flex-none w-1/2 bg-gray-200 p-4">
        <!-- Content for the left panel -->
        <h1 class="text-xl font-bold mb-4">SourceId</h1>
        <p>This is the left panel content.</p>
      </div>
  
      <!-- Right Panel -->
      <div class="flex-grow bg-gray-300 p-4">
        <!-- Content for the right panel -->
        <h1 class="text-xl font-bold mb-4">Right Panel</h1>
        <p>This is the right panel content.</p>
      </div>
  
    </div>
  
  </body>
  </html>
  
  `;  

  res.status(200).send(htmlContent);

  // const { name = 'World' } = query;

  // return res.json({
  //   message: `Hello ${name}!`,
  // });
};