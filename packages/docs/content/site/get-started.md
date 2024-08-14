# Static site

- The `site` workspace can be compiled into a static site, which can then be served as a static resource
- To avoid issues with hoisting npm packages, the site should be run by first navigating to `cd packages/site`
- This site can be hosted on any resource supporting static files, but may include some services that require a serverless node
- The site itself is served statically, but internal navigation is virtualized in the browser: in other words, the site acts as an SPA when browsed on the client

## App frontend
To build the frontend:
- Clone this repo
- Make sure Node.js 20 or newer is installed
  - A version 1 or 2 lockfile will not be compatible with this site, so NPM v7 or higher must be used
- Make sure your `.env` file is set up
- Configure a self-signed certificate for local HTTPS support (see section below)
- Install npm dependencies by running `npm ci`
- Run `npm run dev-site` from the repo root to initiate local development
- In production, run `npm run build-site` first, and then run `npm run start-site` to initiate the production instance of the application (`pm2` can optionally be used to persist this process)
- In either case, the app will let you know which port it's running in the shell's stdout


## Static site
To build this static site site:
- Clone this repo
- Make sure Node.js 20 or newer is installed
  - A version 1 or 2 lockfile will not be compatible with this site, so NPM v7 or higher must be used
- Configure a self-signed certificate for local HTTPS support (see next section)
- Install NPM dependencies by running `npm ci`
- Then, either generate the static site, or run it in local development mode:
  - To build the static site
    - Run `npm run generate-site`
    - A directory `.output/public` will be created, which contains the static site output
  - To run in local development mode, for features like hot reload:
    - Run `npm run dev`
    - The site will be available in real time via a localhost URL


## Content

Frontend content is abstracted to a variety of key `json` files. Currently, the best approach to change content is to clone this repo or edit values in Github. In the future, these json files can be coupled with a headless CMS (ideally one that commits directly into Github and retains the current workflow).

The following is a (non-exhaustive) list of sample key files where content may be found

- `packages/site/data/`
- `packages/site/content/`

It's important to maintain abstraction of content, so anything that's content related should be added to json or markdown files, and never within components or other application code files.
