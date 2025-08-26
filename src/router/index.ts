import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/file-tree',
      children: [
        {
          path: '/file-tree',
          name: 'tree',
          component: () => import('@/views/FileTree.vue'),
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
