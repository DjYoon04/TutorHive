import { createRouter, createWebHistory } from 'vue-router'; 
import Home from '@/views/Home.vue'; 
import extrapage from '@/views/extrapage.vue'; 
const routes = [ 
{ 
path: '/', 
name: 'Home', 
component: Home, 
}, 
{ 
path: '/extrapage', 
name: 'extrapage', 
component: extrapage, 
}, 
]; 
const router = createRouter({ 
history: createWebHistory(), 
routes, 
}); 
export default router;