import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/container/Index'
import Form from '@/container/Form'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    }
  ]
})
