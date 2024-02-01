# vercelnode
sample code to dev and deploy vercel node serverless function

# high level steps
- fork this repo to your git repo
- git clone the example repo
- install vercel cli
- run vercel to deploy to your vercel account, follow all default
- after the deployment, cli returns the endpoint, add /api/hello to it to test the deployment
- back to vercel site, connect app to your repo
- make small change and push change to repo
- see if the deployment works

# create 
- npm init to create a package.json (don't think i really need htis)

# create api/hello.js file

#  install vercel cli
 npm i -g vercel

# clone project locally

# run vercel

Vercel CLI 32.2.5
? Set up and deploy “~/coding/play/vernode”? [Y/n] y
? Which scope do you want to deploy to? wlai-lp
? Link to existing project? [y/N] n
? What’s your project’s name? vernode
? In which directory is your code located? ./
Local settings detected in vercel.json:
No framework detected. Default Project Settings:
- Build Command: `npm run vercel-build` or `npm run build`
- Development Command: None
- Install Command: `yarn install`, `pnpm install`, `npm install`, or `bun install`
- Output Directory: `public` if it exists, or `.`
? Want to modify these settings? [y/N] n
🔗  Linked to wlai-lp/vernode (created .vercel and added it to .gitignore)
🔍  Inspect: https://vercel.com/wlai-lp/vernode/7oWdEaBxc1tTARYimCzdV5AjCXHe [1s]
✅  Preview: https://vernode-j846j593p-wlai-lp.vercel.app [1s]
📝  Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).

# The actual api end point is /api/hello

# use `vercel dev` to dev locally
- the endpoint is localhost:3000/api/hello
- use vercel web to create environment var and then in cli use `vercell env pull` to pull it locally for local dev


# tech stack
- use clark to auth application/endpoints
    - see api/demo/auth.ts for template code
    - every endpoint should have clerk window auth to verify session (TODO)
- use vercel node serverless to create endpoints for the applications
    - this can also return html page for the app
- use htmx to invoke api endpoings
- TODO: use convex to do DB
    - user session mapping, source/destination
    - logging
    - clone mapping, 

# LP deveopment
- basically reference contact center management api and implement all end points
`https://developers.liveperson.com/agent-groups-api-overview.html`

## cloning flow
- user login to source
- app returns LP auth token and sourceID as cookie, and html elements to loging to dest
- user login to destination 
- app returns LP auth token and destID as cookie, and redirects to the compare page
- compare page displays all the contact center elements
- allows user to clone components

# App features nice to have
- user portal
- track of user cloning requests
- log cloning calls for easier trouble shooting
    - db, log url and payload info, completed flag
- dashboard to report status
- realtime reactive feedback to update user on status using convext to log activities


# HTMX ref
## use header to trigger another endpoint on 
- server respond trigger event
res.setHeader('HX-Trigger', 'myEvent');

- client element has trigger, the bubble up to body
hx-trigger="myEvent from:body"


## use header to redirect
res.setHeader('HX-Redirect', compareUrl);