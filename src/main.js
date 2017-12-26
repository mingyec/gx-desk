import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './fetch'
import i18n from './lang'
import store from './store'
import './icons'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './components/Highcharts'
// import 'normalize.css/normalize.css'

Vue.config.productionTip = false
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
});
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    template: '<App/>',
    components: { App }
})
