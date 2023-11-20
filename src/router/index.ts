import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/components/LoginForm.vue';
import Register from '@/components/RegistrationForm.vue';
import Timer from '@/components/Timer.vue';
import Tasks from '@/components/TaskManager.vue';
import Profile from '@/components/Profile.vue';
import Sidebar from '@/components/SideNavigationBar.vue';

const routes = [
	{
		path: "/",
		name: "Default",
		component: Sidebar,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
	},
	{
		path: "/timer",
		name: "Timer",
		component: Timer,
	},
	{
		path: "/tasks",
		name: "Tasks",
		component: Tasks,
	},
	{
		path: "/profile",
		name: "Profile",
		component: Profile,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
