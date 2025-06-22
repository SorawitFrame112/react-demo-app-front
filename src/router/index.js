// src/router/index.js
import Home from '../components/feature/common/Home';
import Login from '../components/feature/common/Login';
import SetupCurrency from '../components/feature/master/currentcy/SetupCurrency';
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/Home',
    name: 'home',
    component: Home,
  },
  {
    path: '/currency',
    name: 'currency',
    component: SetupCurrency,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: { template: '<div>You are not authorized to view this page.</div>' }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;