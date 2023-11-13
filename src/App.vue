<script setup>
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/:name', component: Login },
	],
});

router.addRoute({ path: '/profile', component: Profile });
router.addRoute({ path: '/login', component: Login });
router.addRoute({ path: '/register', component: Registration });
router.addRoute({ path: '/timer', component: Timer });
router.addRoute({ path: '/tasks', component: Tasks });
</script>

<template>
    <header>
    </header>
    <main>
		<SideNavigationBar />
		<Profile />
	</main>
</template>

<script>
import { createRouter, createWebHistory } from 'vue-router';

import Login from './components/LoginForm.vue';
import Registration from './components/RegistrationForm.vue';
import Timer from './components/Timer.vue';
import Tasks from './components/TaskManager.vue';
import Profile from './components/Profile.vue';
import SideNavigationBar from './components/SideNavigationBar.vue';

export default {
  name: 'App',
  components: {
	Login,
	Registration,
	Timer,
	Tasks,
	Profile,
	SideNavigationBar,
  },
};

</script>

<style scoped>
</style>
