import { createRouter, createWebHistory } from 'vue-router'
import FileListPage from "@/views/FileListPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/file-grid/root' },
    {
      path: '/file-grid/:id?',
      name: 'grid',
      component: FileListPage,
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
    },
  ],
})

export default router
