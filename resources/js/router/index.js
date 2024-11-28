import { createRouter, createWebHistory } from 'vue-router'; 
import Home from '@/views/Home.vue'; 
import dashboard from '@/views/dashboard.vue';
import dashboardTutors from '../views/dashboardTutors.vue'; 
import AuthPage from '../views/AuthPage.vue'
import StudentProfile from '../views/StudentProfile.vue';
import TutorProfile from '../views/TutorProfile.vue';

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
path: '/auth',
name: 'Auth',
component: AuthPage,
props: (route) => ({ isLogin: route.query.mode !== 'signup' })  
},

{
path: '/StudentProfile',
name: 'StudentProfile',
component: StudentProfile
},

{
path: '/TutorProfile',
name: 'TutorProfile',
component: TutorProfile
},
    

];

const router = createRouter({ 
history: createWebHistory(), 
routes, 
}); 

export default router;