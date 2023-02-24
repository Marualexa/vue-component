import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ErrorView from '../views/404View.vue';

const stage = import.meta.env.VITE_STAGE

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // { path: '/home', redirect: { name: 'home' } },

    { path: '/404', component: ErrorView },
    { path: '/:catchAll(.*)', redirect: '/404' },
    { path: '/', name: 'home', component: HomeView, alias: '/home', meta: { requiresAuth: false }},
    {
      path: '/session', component: () =>
        import('../views/SeccionView.vue'),
      children: [
        {
          path: '',
          components: {
            default: () => import('../views/LoginView.vue'),
            registro: () => import('../views/registroView.vue')
          }
        }
      ]
    },
    { path: '/about', name: 'about', component: () => import('../views/AbountView.vue') },
    {
      path: '/chats',
      component: () => import('../views/ChatsView.vue'),
      meta: { requiresAuth: true, roles: ['admin'] },
      children: [
        {
          path: ':chatId(\\d+)', component: () => import('../views/ChatView.vue'),
          props: (route) => {
            return {
              chatId: route.params.chatId
            }
          }
        }
      ]
    }
  ]
})

if (stage === 'test') {
  router.addRoute({
    path: '/profile',
    component: () => import('../views/profileView.vue')
  })
}

router.beforeEach((to, from) => {
  console.log(to, from)

  // if (to.meta?.requiresAuth && to.meta.roles.includes('admin')) {
  //   console.log(to.path, 'requires auth')
  //   return '/seccion'
  // }
  
  // if (from.path === '/') return { name: 'abountView' }
  // // if (from.path === '/') return '/abount'
  return true;
  //return false
})

export default router