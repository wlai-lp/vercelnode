# vercelnode
sample code to dev and deploy vercel node serverless function

# High Level Steps
- fork this repo to your git repo
- git clone the example repo
- install vercel cli
- run vercel to deploy to your vercel account, follow all default
- after the deployment, cli returns the endpoint, add /api/hello to it to test the deployment
- back to vercel site, connect app to your repo
- make small change and push change to repo
- see if the deployment works

# Details steps
## create a standard node init 
> npm init to create a package.json (don't think i really need this)

## create api/hello.js file
> touch api/hello.js
or use typescript (recommended)
> touch api/hello.ts

##  install vercel cli
> npm i -g vercel

# clone project locally
> git clone ...

# run vercel
> vercel

sample output
> Vercel CLI 32.2.5
> ? Set up and deploy “~/coding/play/vernode”? [Y/n] y
> ? Which scope do you want to deploy to? wlai-lp
> ? Link to existing project? [y/N] n
> ? What’s your project’s name? vernode
> ? In which directory is your code located? ./
> Local settings detected in vercel.json:
> No framework detected. Default Project Settings:
> - Build Command: `npm run vercel-build` or `npm run build`
> - Development Command: None
> - Install Command: `yarn install`, `pnpm install`, `npm install`, or `bun install`
> - Output Directory: `public` if it exists, or `.`
> ? Want to modify these settings? [y/N] n
> 
> 🔗  Linked to wlai-lp/vernode (created .vercel and added it to .gitignore)
> 🔍  Inspect: https://vercel.com/wlai-lp/vernode/7oWdEaBxc1tTARYimCzdV5AjCXHe [1s]
> ✅  Preview: https://vernode-j846j593p-wlai-lp.vercel.app [1s]
> 📝  Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).


# use `vercel dev` to dev locally
- the endpoint is localhost:3000/api/hello
- use vercel web to create environment var and then in cli use `vercell env pull` to pull it locally for local dev

process.env.API_URL;

# Test hello serverless function
> The actual api end point is /api/hello

# Additional Note: LP Clone 
This starts off as a side project to test vercel's serverless function, but I'm slowly building a real working web site with it to see how far I can go with this.

The objective is to create a functional website to clone LP site from one to another

What I'm aiming for is to make it as lean as possible, yet a fully functional website you would expect from a professional modern website builder.  

This allows me to try different services and technologies.  I would try to incorporate them along the way and make some notes about them



# Current Tech Stack
- use clark to auth application/endpoints
    - see api/demo/auth.ts for template code
    - every endpoint should have clerk window auth to verify session (TODO)
- use vercel node serverless to create endpoints for the applications
    - this can also return html page for the app
- use htmx to invoke api endpoings
- use tailwind + daisyui for presentation layer
- plain old html with no build tool ()
- TODO: use convex to do DB
    - user session mapping, source/destination
    - logging
    - clone mapping, 

# LP Clone
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


# What I've learned
This is a learning exprience.  The following are some of the new things that I've treid
## github readme.md
you can straight add html in it like 


<p align="center">
  <a href="https://clerk.com?utm_source=github&utm_medium=clerk_docs" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://images.clerk.com/static/logo-dark-mode-400x400.png">
      <img src="https://images.clerk.com/static/logo-light-mode-400x400.png" height="64">
    </picture>
  </a>
  <br />
</p>
<div align="center">
  <h1>
    Clerk Documentation
  </h1>
  <h3>More than authentication.<br />Complete user management.</h3>
  <a href="https://www.npmjs.com/package/@clerk/clerk-js">
    <img alt="" src="https://img.shields.io/npm/dm/@clerk/clerk-js" />
  </a>
  <a href="https://clerk.com/discord">
    <img alt="Discord" src="https://img.shields.io/discord/856971667393609759?color=7389D8&label&logo=discord&logoColor=ffffff" />
  </a>
  <a href="https://twitter.com/clerkdev">
    <img alt="Twitter" src="https://img.shields.io/twitter/url.svg?label=%40clerkdev&style=social&url=https%3A%2F%2Ftwitter.com%2Fclerkdev" />
  </a> 
  <br />
  <br />
  <img alt="Clerk Hero Image" src="https://github.com/clerk/clerk-docs/blob/df9c607030f351d359c752e2a237664cfb098ba9/public/images/home/docs-hero-light.svg">
</div>

## github project
- a project management tool, you can create task and assign task to a gitrepo
- it shows up as a open task under Projects of the repo
- from projects/project name view, you can click the title of the task to bring up detail view
- then there's a `Development` section on the right panel to `Creat a branch`
- this way you can go from task to git branch to develop to PR and track it all the way
- i wish GH let you do that from repo/project view, but it's just 1 extra click

# Utilities
## sharex
https://getsharex.com/
- i want to tool that I can do a screenshot and automatically upload it to a cloud img hosting site and generate a link to share the image, this way i can easily embed in this readme file
- looks like a good tool, i haven't try it yet