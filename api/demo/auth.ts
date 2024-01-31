import type { VercelRequest, VercelResponse } from '@vercel/node';

export default ({ query }: VercelRequest, res: VercelResponse) => {

  const htmlContent = `

  <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script
      async
      crossorigin="anonymous"
      data-clerk-publishable-key="pk_test_ZXhwZXJ0LWNveW90ZS0xNS5jbGVyay5hY2NvdW50cy5kZXYk"
      onload="sayhi()"
      src="https://expert-coyote-15.clerk.accounts.dev/npm/@clerk/clerk-js@4/dist/clerk.browser.js"
      type="text/javascript"
    ></script>
    <script>
        async function sayhi(){
            console.log("hi");
            await window.Clerk.load();
            window.Clerk.openSignIn();
        }
    </script>
  </head>
  <body>
    <SignIn />
    i have a signin button
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