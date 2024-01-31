import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parse } from 'cookie'

export default (req: VercelRequest, res: VercelResponse) => {

    // console.log(req.headers.cookie);
    const rawCookieHeader = req.headers.cookie || '';

    // Parse the raw cookie header using the cookie package
    const cookies = parse(rawCookieHeader);
    console.log(cookies['LPsourcetoken']);
    const lpSourceSite = cookies['LPsourcesiteid'];
    const lpDestSite = cookies['LPdestsiteid'];

    // TODO: error handling site cookies param

  const htmlContentTemplate = `
<html data-theme="synthwave">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/daisyui@4.6.1/dist/full.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <script src="https://cdn.tailwindcss.com"></script>

    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
    <title>Compare 2 LP Sites</title>
  </head>

  <body>
    <div class="grid grid-cols-2 gap-4 p-8">
      <!-- Panel 1 -->
      <div class="join join-vertical w-full">
        <h2 class="text-lg font-semibold mb-2">
          Source SiteID : {lpSourceSite}
        </h2>
        <div class="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" checked="checked" />
          <div class="collapse-title text-xl font-medium">Skills</div>
          <div class="collapse-content">
            <div class="overflow-x-auto">
              <div hx-get="/api/skill/getskills?param=source" hx-trigger="load">
                <img
                  alt="Result loading..."
                  class="htmx-indicator"
                  width="150"
                  src="https://htmx.org/img/bars.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div class="collapse-title text-xl font-medium">
            Click to open this one and close others
          </div>
          <div class="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div class="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div class="collapse-title text-xl font-medium">
            Click to open this one and close others
          </div>
          <div class="collapse-content">
            <p>hello</p>
          </div>
        </div>
      </div>

      <!-- panel 2 lpDestSite -->
      <div class="join join-vertical w-full">
        <h2 class="text-lg font-semibold mb-2">
          Source SiteID : {lpDestSite}
        </h2>
        <div class="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-5" checked="checked" />
          <div class="collapse-title text-xl font-medium">Skills</div>
          <div class="collapse-content">
            <div class="overflow-x-auto">
              <div
                hx-trigger="myEvent from:body"
                hx-get="/api/skill/getskills?param=dest"
              >
                <div hx-get="/api/skill/getskills?param=dest" hx-trigger="load">
                  <img
                    alt="Result loading..."
                    class="htmx-indicator"
                    width="150"
                    src="https://htmx.org/img/bars.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-5" />
          <div class="collapse-title text-xl font-medium">
            Click to open this one and close others
          </div>
          <div class="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div class="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-5" />
          <div class="collapse-title text-xl font-medium">
            Click to open this one and close others
          </div>
          <div class="collapse-content">
            <p>hello</p>
          </div>
        </div>
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