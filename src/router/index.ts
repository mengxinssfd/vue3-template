import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Token from '@/common/ts/Token';
import Home from '@/views/home/Home.vue';

const PROJECT_NAME = import.meta.env.VITE_APP_TITLE;

interface RouteMeta {
  requiresAuth?: boolean;
  title?: string;
  scrollBehavior?: boolean;
}
type CustomRouteRecordRaw = Omit<RouteRecordRaw, 'meta' | 'children'> & {
  meta?: RouteMeta;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children?: CustomRouteRecordRaw[];
};

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: { title: `${PROJECT_NAME} - 首页`, scrollBehavior: false },
    component: Home,
  },
  {
    path: '/:pathMatch(.*)*',
    meta: { title: `${PROJECT_NAME} - 404` },
    name: 'NotFount',
    component: () => import('@/views/404/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
  scrollBehavior(to, from, savedPosition) {
    const meta: RouteMeta = to.meta as any;
    if (meta.scrollBehavior === false && to.path === from.path) return;
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const meta: RouteMeta = to.meta as any;
  if (meta.requiresAuth && !Token.exists()) {
    next({ path: '/login', query: { fromUrl: encodeURIComponent(to.fullPath) } });
    return;
  }
  if (meta.title) {
    document.title = meta.title;
  }
  next();
});

export default router;
