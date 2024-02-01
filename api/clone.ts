import type { VercelRequest, VercelResponse } from '@vercel/node';

export default ({ query }: VercelRequest, res: VercelResponse) => {

  const htmlContentTemplate = `
  <html data-theme="{DAISYUI_THEME}">
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
    <title>LP Site Cloning Tool</title>
  </head>

  <body>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Login</h1>
          <p class="py-6">Please make sure the user has admin right.</p>
        </div>
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form class="card-body" action="#" method="POST">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Soure Site ID</span>
              </label>
              <input type="text" id="siteid" name="siteid" placeholder="source site id" class="input input-bordered" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">User Name</span>
              </label>
              <input type="text" id="username" name="username" placeholder="user name" class="input input-bordered" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input type="password" id="password" name="password" placeholder="password" class="input input-bordered" required />              
            </div>
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary"  hx-post="/api/login" hx-swap="outerHTML">Login to Source Site</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </body>
</html>



  `;
  // todo: generate a session id
  const sessionId = 'adflk23423'
  res.setHeader("Content-Type", "text/html");
  res.setHeader('Set-Cookie', `LPcloneSession=${sessionId}`);
  console.log(process.env.API_KEY);
  console.log(process.env.DAISYUI_THEME);
  // set daisy theme
  const htmlContent = htmlContentTemplate.replace("{DAISYUI_THEME}", process.env.DAISYUI_THEME);

  res.status(200).send(htmlContent);

  // const { name = 'World' } = query;

  // return res.json({
  //   message: `Hello ${name}!`,
  // });
};