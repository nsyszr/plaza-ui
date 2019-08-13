import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/manage/devices',
      name: 'manage-devices',
      component: () => import('./containers/manage/devices'),
      props: true
    },
    {
      path: '/administration/organisations',
      name: 'administration-organisations',
      component: () => import('./views/administration/Organisations.vue')
    },
    {
      path: '/administration/organisations/:uuid',
      name: 'administration-organisation-details',
      component: () => import('./views/administration/OrganisationDetails.vue'),
      props: true
    },
    {
      path: '/administration/users',
      name: 'administration-users',
      component: () => import('./views/administration/Users.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})