require('./bootstrap');

import Vue from 'vue';
import * as Sentry from "@sentry/vue";

Sentry.init({
    Vue,
    dsn: process.env.SENTRY_LARAVEL_DSN,
});

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const app = new Vue({
    el: '#app',
}).$mount('#app');
