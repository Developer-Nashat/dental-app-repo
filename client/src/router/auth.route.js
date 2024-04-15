import { AuthLayout } from '../views/layouts'
import login from '../views/auth/LoginPage.vue'
export default {
  path: '/auth',
  component: AuthLayout,
  children: [{ path: 'login', component: login }]
}
