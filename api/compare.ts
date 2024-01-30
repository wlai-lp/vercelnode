import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parse } from 'cookie'

export default (req: VercelRequest, res: VercelResponse) => {

    // console.log(req.headers.cookie);
    const rawCookieHeader = req.headers.cookie || '';

    // Parse the raw cookie header using the cookie package
    const cookies = parse(rawCookieHeader);
    console.log(cookies['LPsourcetoken']);
    const lpSourceSite = cookies['LPsourcesiteid'];
    const lpDestSite = cookies['LPdestiteid'];

    // TODO: error handling site cookies param

  const htmlContentTemplate = `
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/daisyui@4.6.1/dist/full.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
    <title>Compare 2 LP Sites</title>
  </head>
  <body class="bg-gray-100">
    <div class="grid grid-cols-2 gap-4 p-8">
      <!-- Panel 1 -->
      <div class="bg-white p-4">
        <h2 class="text-lg font-semibold mb-2">Source SiteID : {lpSourceSite}</h2>
        <details class="collapse bg-base-200">
          <summary class="collapse-title text-xl font-medium">Skills</summary>
          <div class="collapse-content">
            <div hx-get="/api/getskills?param=source" hx-trigger="load">
              <img
                alt="Result loading..."
                class="htmx-indicator"
                width="150"
                src="https://htmx.org/img/bars.svg"
              />
            </div>
          </div>
        </details>
      </div>

      <!-- Panel 2 -->
      <div class="bg-white p-4">
        <h2 class="text-lg font-semibold mb-2">Desitnation SiteID : {lpDestSite}</h2>
        <details class="collapse bg-base-200">
          <summary class="collapse-title text-xl font-medium">Skills</summary>
          <div class="collapse-content">
            <div hx-get="/api/getskills?param=dest" hx-trigger="load">
              <img
                alt="Result loading..."
                class="htmx-indicator"
                width="150"
                src="https://htmx.org/img/bars.svg"
              />
            </div>
          </div>
        </details>
      </div>
    </div>
  </body>
</html>

  
  `;  

  // replace siteids
  const htmlContent = htmlContentTemplate.replace("{lpSourceSite}", lpSourceSite).replace("{lpDestSite}", lpDestSite);

  res.status(200).send(htmlContent);

  // const { name = 'World' } = query;

  // return res.json({
  //   message: `Hello ${name}!`,
  // });
};