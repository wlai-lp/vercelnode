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