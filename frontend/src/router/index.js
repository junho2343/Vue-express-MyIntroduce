import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
// import Example from '@/components/Example'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/github',
      beforeEnter () { location.href = 'https://github.com/junho2343' }
    }
  ]
})
