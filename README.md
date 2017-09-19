# Clio

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with (only the first time) `mix ecto.reset`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix


## Building the Client code
To get the dependencies:

  * Make sure you have `node` and `npm` installed
  * Go to `assets` folder
  * Run `npm install` to download the dependencies (`node_modules` folder and `package-lock.json` will be created in the `assets` folder)

To to build the Client resources for different modes:

* For `Development` with hot reloading: in `assets` folder run `npm run develop`. The code will be served on [`http://localhost:8080`](http://localhost:8080) (if no corresponding environment variables have been provided - see below)
* For `Production` (resources saved in `static` folder): in `assets` folder run `npm run production`
* For `Production with Server Side Rendering` (resources saved in `static` folder) in `assets` folder run `npm run ssr`

If you want to serve the production code (for both SSR and non-SSR) on node server add `:start` after the script's name (Example: `npm run production:start`). The code will be served on [`http://localhost:3003`](http://localhost:3003)

## Passing environment variables when building the Client code

To pass environmental variables, set them after the script's name like in this example: `npm run develop --port=8081 --host=http://localhost --apiurl=http://localhost:4000/`. If not provided, default values will be used (set in webpack config files)

## Learn more about Frontend technologies stack

  * Node: https://nodejs.org/en/
  * Webpack: https://webpack.js.org/
  * webpack-dev-server: https://www.npmjs.com/package/webpack-dev-server
  * Vue.js: https://vuejs.org/
  * Vuex: https://vuex.vuejs.org/en/
  * Vue.js Server Side Rendering: https://vuejs.org/v2/guide/ssr.html
  * apollo-client: https://www.npmjs.com/package/apollo-client
  * SCSS: http://sass-lang.com/
