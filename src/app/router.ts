import { createRouter, createWebHistory } from 'vue-router'

import PanelLayout from '../layouts/PanelLayout.vue'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import StudentsPage from '../pages/StudentsPage.vue'
import CoursesPage from '../pages/CoursesPage.vue'
import ReportsPage from '../pages/ReportsPage.vue'
import SettingsPage from '../pages/SettingsPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/',
      component: PanelLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardPage,
        },
        {
          path: 'students',
          name: 'students',
          component: StudentsPage,
        },
        {
          path: 'courses',
          name: 'courses',
          component: CoursesPage,
        },
        {
          path: 'reports',
          name: 'reports',
          component: ReportsPage,
        },
        {
          path: 'settings',
          name: 'settings',
          component: SettingsPage,
        },
      ],
    },
  ],
})

export default router