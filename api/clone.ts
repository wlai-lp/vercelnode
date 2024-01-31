import type { VercelRequest, VercelResponse } from '@vercel/node';

export default ({ query }: VercelRequest, res: VercelResponse) => {

  const htmlContent = `
<!DOCTYPE html>
<html data-theme="light">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LP Account Clone</title>
  <!-- Include Tailwind CSS styles -->
  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.6.1/dist/full.min.css" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
  <script src="https://unpkg.com/htmx.org@1.9.10"></script>
</head>

<body class="flex items-center justify-center h-screen bg-gray-200">
  <div id="login-form">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-semibold mb-6">LP Account</h2>
      <form action="#" method="POST">
      
        <div class="mb-4">
          <label for="LP SiteId" class="block text-sm font-medium text-gray-600">LP SiteId</label>
          <input type="text" id="siteid" name="siteid"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500">
        </div>
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-600">Username</label>
          <input type="text" id="username" name="username"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <input type="password" id="password" name="password"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500">
        </div>
        
        <button hx-post="/api/login" hx-swap="outerHTML"
        hx-include="#siteid, #username, #password"
        onClick="Toastify({
          text: 'This is a toast',
          className: 'info',
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          }
        }).showToast();"
                class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Login to Source Site
        </button>
      </form>
    </div>
  </div>
</body>

</html>


  `;
  // todo: generate a session id
  const sessionId = 'adflk23423'
  res.setHeader("Content-Type", "text/html");
  res.setHeader('Set-Cookie', `LPcloneSession=${sessionId}`);
  

  res.status(200).send(htmlContent);

  // const { name = 'World' } = query;

  // return res.json({
  //   message: `Hello ${name}!`,
  // });
};