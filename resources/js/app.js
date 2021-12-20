require('./bootstrap');

import Vue from 'vue';
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Vue.config.silent = false;

Sentry.init({
    Vue,
    dsn: process.env.SENTRY_LARAVEL_DSN,
    integrations: [
        new Integrations.BrowserTracing({
            tracingOrigins: ["localhost", "laravel-sentry-sourcemaps-demo.pogi.dev", /^\//],
        }),
    ],
    tracesSampleRate: 1.0,
    debug: true
});

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const app = new Vue({
    el: '#app',
}).$mount('#app');
