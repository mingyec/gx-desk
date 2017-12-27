import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'views/layout/Layout'
const $import = require(`./import_${process.env.NODE_ENV}`);
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export const constantRouterMap = [{
    path: '',
    component: Layout,
    name: 'demo',
    meta: {
        title: 'Demo',
        icon: 'example'
    },
    children: [{
        path: 'hello',
        component: $import('test/HelloWorld'),
        name: 'hello',
        meta: {
            title: 'hello',
            icon: 'example'
        }
    }, {
        path: 'datepicker',
        component: $import('test/DatePicker'),
        name: 'datepicker',
        meta: {
            title: '监测树',
            icon: 'example'
        }
    }, {
        path: 'realtimeCurve',
        component: $import('realtime/RealtimeCurve'),
        name: 'realtimeCurve',
        meta: {
            title: '实时曲线',
            icon: 'example'
        }
    }]
}]

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
