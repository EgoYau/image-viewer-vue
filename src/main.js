// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Spin } from 'iview';
import 'iview/dist/styles/iview.css'
import imageViewer from './lib/index.js'

Vue.use(imageViewer)
Vue.config.productionTip = false
Vue.component('Spin', Spin);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App/>'
})