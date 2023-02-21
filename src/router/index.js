import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/about', component: () => mport('../views/AboutView.vue') },
    { 
      path: '/chats',
      component: () => import('../views/ChatsView.vue'),
      children: [
        { path: ':chatId', component: () => import('../views/ChatView.vue') }
      ]
    }
  ]
})

export default router