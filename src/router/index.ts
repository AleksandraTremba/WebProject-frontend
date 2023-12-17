import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/components/access/LoginForm.vue';
import Register from '@/components/access/RegistrationForm.vue';
import Timer from '@/components/timer/Timer.vue';
import Tasks from '@/components/tasks/TaskManager.vue';
import Profile from '@/components/profile/Profile.vue';
import Home from '@/components/Home.vue';
import Groups from '@/components/groups/GroupPage.vue';
import Records from '@/components/records/RecordsPage.vue';

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
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
	{
		path: "/groups",
		name: "Groups",
		component: Groups,
	},
	{
		path: "/records",
		name: "Records",
		component: Records,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
