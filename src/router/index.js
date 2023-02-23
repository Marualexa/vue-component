import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // { path: '/home', redirect: { name: 'home' } },
    { path: '/', name: 'home', component: HomeView, alias: '/home' },
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
      children: [
        {
          path: ':chatId', component: () => import('../views/ChatView.vue'),
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

export default router