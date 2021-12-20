const mix = require('laravel-mix');
const webpack = require('webpack'); 

// Allows reading of directives from the `.env` file.
require('dotenv').config({ path: './.env' }); 

// Sends source file artefacts to Sentry for source mapping 
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

// We only want certain configs and plugins to run on production
// We don't want to send the source files to Sentry every time front-end files are rebundled
const isProduction = process.env.APP_ENV === 'production';

const commonPlugins = [
    new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env)
      }),
];

if (isProduction) {
    mix.webpackConfig({
        // other webpack configuration
        devtool: 'source-map',
        plugins: [
          ...commonPlugins,
          new SentryWebpackPlugin({
            // sentry-cli configuration - can also be done directly through sentry-cli
            // see https://docs.sentry.io/product/cli/configuration/ for details
            authToken: process.env.SENTRY_AUTH_TOKEN,
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            release: process.env.SENTRY_RELEASE,
      
            // other SentryWebpackPlugin configuration
            include: "./resources",
            ignore: ["node_modules", "webpack.config.js", "webpack.mix.js"],
          }),
        ],
      });
} else {
    mix.webpackConfig({
        plugins: [
            ...commonPlugins,
        ]
    });     
}

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .sourceMaps(true, 'source-map')
    .sass('resources/sass/app.scss', 'public/css');
