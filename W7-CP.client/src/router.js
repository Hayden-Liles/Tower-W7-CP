import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  // SECTION EVENT PAGES
  {
    path: '/events/:eventId',
    name: 'Event',
    component: loadPage('EventPage'),
    beforeEnter: authSettled
  },
  {
    path: '/create_event',
    name: 'CreateEvent',
    component: loadPage('CreateEventPage'),
    beforeEnter: authGuard
  },
  {
    path: '/events/:eventId/Edit',
    name: 'EditEvent',
    component: loadPage('EditEventPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
