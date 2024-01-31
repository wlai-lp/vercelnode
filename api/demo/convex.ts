import type { VercelRequest, VercelResponse } from '@vercel/node';

export default ({ query }: VercelRequest, res: VercelResponse) => {

  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!DOCTYPE html>
<script src="https://unpkg.com/convex@1.3.1/dist/browser.bundle.js"></script>
<script>
  const CONVEX_URL = "https://handsome-stork-174.convex.cloud";
  const client = new convex.ConvexClient(CONVEX_URL);
  client.onUpdate("tasks:get", {}, (tasks) =>
    console.log(tasks.map((task) => task.text)));
</script>
</head>
<body>
    hello...
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