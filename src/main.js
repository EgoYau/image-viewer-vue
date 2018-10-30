// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iviewUI from 'iview'
import 'iview/dist/styles/iview.css'
import imageViewer from './lib/index.js'
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.use(iviewUI)
Vue.use(imageViewer)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App/>'
})