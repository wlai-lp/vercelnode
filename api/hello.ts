import type { VercelRequest, VercelResponse } from '@vercel/node';

export default ({ query }: VercelRequest, res: VercelResponse) => {

  const htmlContent = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Form</title>
    <!-- Include Tailwind CSS styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
  </head>
  
  <body class="flex items-center justify-center h-screen bg-gray-200">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-semibold mb-6">Login</h2>
      <form action="#" method="POST">
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
        <button type="submit"
                class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Login
        </button>
      </form>
    </div>
  </body>
  
  </html>
  `;
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(htmlContent);


  // const { name = 'World' } = query;

  // return res.json({
  //   message: `Hello ${name}!`,
  // });
};
