import { createRouter, createWebHistory } from 'vue-router'; 
import Home from '@/views/Home.vue'; 
import dashboard from '@/views/dashboard.vue';
import dashboardTutors from '../views/dashboardTutors.vue'; 
import AuthPage from '../views/AuthPage.vue'

const routes = [ 
{ 
path: '/', 
name: 'Home', 
component: Home, 
}, 
{
 path: '/dashboard',
name: 'dashboard',
component: dashboard
},
    
{
path: '/dashboardTutors',
name: 'dashboardTutors',
component: dashboardTutors
},

{
path: '/Auth',
name: 'Auth',
component: AuthPage
},

{
    path: '/dashboard',
    name: 'StudentDashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/dashboardTutors',
    name: 'TutorDashboard',
    component: () => import('@/views/DashboardTutors.vue')
  }
  

];

const router = createRouter({ 
history: createWebHistory(), 
routes, 
}); 

export default router;

