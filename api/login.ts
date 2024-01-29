import type { VercelRequest, VercelResponse } from '@vercel/node';

export default ({ query }: VercelRequest, res: VercelResponse) => {

  const htmlContent = `
      <button hx-post="/login" hx-swap="outerHTML"
              class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
        Login htmx destination
      </button>
  `;
  // todo: generate a session id
  const sessionId = 'adflk23423'
  res.setHeader("Content-Type", "text/html");
//   res.setHeader('Set-Cookie', `LPcloneSession=${sessionId}`);
  

  res.status(200).send(htmlContent);

  // const { name = 'World' } = query;

  // return res.json({
  //   message: `Hello ${name}!`,
  // });
};