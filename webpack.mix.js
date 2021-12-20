const mix = require('laravel-mix');
const webpack = require('webpack'); 

// replace accordingly './.env' with the path of your .env file 
require('dotenv').config({ path: './.env' }); 

const SentryWebpackPlugin = require("@sentry/webpack-plugin")

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    // other webpack configuration
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env)
      }),
      new SentryWebpackPlugin({
        // sentry-cli configuration - can also be done directly through sentry-cli
        // see https://docs.sentry.io/product/cli/configuration/ for details
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "personal-vuc",
        project: "personal-vuc",
        release: process.env.SENTRY_RELEASE,
  
        // other SentryWebpackPlugin configuration
        include: ".",
        ignore: ["node_modules", "webpack.config.js", "webpack.mix.js"],
      }),
    ],
  });

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .sourceMaps(true, 'source-map')
    .sass('resources/sass/app.scss', 'public/css');
