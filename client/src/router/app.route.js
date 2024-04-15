import { AppLayout } from '../views/layouts'
import home from '../views/HomeView.vue'
import about from '../views/AboutView.vue'
import problemCatalog from '../views/management/ProblemCatalogView.vue'
export default {
  path: '/dental',
  component: AppLayout,
  children: [
    { path: '', component: home },
    { path: '/about', component: about },
    { path: '/problems', component: problemCatalog }
  ]
}
