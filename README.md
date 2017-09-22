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
### Getting the dependencies:

  * Make sure you have `node` and `npm` installed
  * Go to `assets` folder
  * Run `npm install` to download the dependencies (`node_modules` folder and `package-lock.json` will be created in the `assets` folder)

### Starting the build process and serving the code:

* For `Development`: in `assets` folder run `npm run ssr:watch`. This will first clear the `static` folder, then copy the rendering server and finally will build both the server side and the client side bundles and stay in `watch` mode to rebuild the bundles on saving a file change. To open the application: `in a different console` start the `node server` in the `assets` folder by running the `npm run serverssr`. Then `in a third console` start the `Phoenix` server by running the `mix phx.server` command in the root directory. 
Open the browser at [`http://localhost:4000`](http://localhost:4000).

* For `Production` in `assets` folder run `npm run ssr` and provide environment variables. Get the static folder and copy it to the corresponding folder on the production server. Then you must start the `node server`.


## Passing environment variables when building the bundles:

To pass environmental variables, set them after the script's name like in this example: `npm run develop --port=8081 --host=http://localhost --apiurl=http://localhost:4000/`. If not provided, default values will be used (set in webpack config files)

## Learn more about Frontend technologies stack

  * Node: https://nodejs.org/en/
  * Webpack: https://webpack.js.org/
  * Vue.js: https://vuejs.org/
  * Vuex: https://vuex.vuejs.org/en/
  * Vue.js Server Side Rendering: https://vuejs.org/v2/guide/ssr.html
  * apollo-client: https://www.npmjs.com/package/apollo-client
  * axios: https://github.com/mzabriskie/axios
  * SCSS: http://sass-lang.com/
