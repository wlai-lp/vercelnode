# VercelRequest object

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // Access request parameters
    const { query, body, headers, method } = req;

# set cookies
res.setHeader('Set-Cookie', [
    `LPsoucetoken=${token}; Max-Age=3600`,
    `LPsoucesiteid=${req.body.siteid}; Max-Age=3600`,
  ]);

# read cookies
console.log(req.headers.cookie);

npm install cookie
import { parse } from 'cookie'
 // console.log(req.headers.cookie);
    const rawCookieHeader = req.headers.cookie || '';

    // Parse the raw cookie header using the cookie package
    const cookies = parse(rawCookieHeader);
    console.log(cookies['LPsourcetoken']);

# String interpolation
const name = "John";
const age = 30;

const messageTemplate = "Hello, my name is {name} and I am {age} years old.";
const message = messageTemplate.replace("{name}", name).replace("{age}", age);



# HTMX ref
## use header to trigger another endpoint on 
- server respond trigger event
res.setHeader('HX-Trigger', 'myEvent');

- client element has trigger, the bubble up to body
hx-trigger="myEvent from:body"


## use header to redirect
res.setHeader('HX-Redirect', compareUrl);