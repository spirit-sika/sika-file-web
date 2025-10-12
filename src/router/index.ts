import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/file-tree/root',
      children: [
        {
          path: '/file-tree/:id?',
          name: 'tree',
          component: () => import('@/views/FileListPage.vue'),
        },
      ],
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
    },
  ],
})

export default router
