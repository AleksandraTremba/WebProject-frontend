<script setup>
import LoginForm from './components/LoginForm.vue';
import RegistrationForm from './components/RegistrationForm.vue';
import HomePage from './components/HomePage.vue';
import TopTimer from './components/TopTimer.vue';
import Sidebar from './components/Sidebar.vue';
import GroupPage from './components/GroupPage.vue';
</script>

<template>
    <header>
    </header>
    <main>
        <div class="mx-auto p-2" style="width: 280px;">
            <GroupPage />
        </div>
    </main>
</template>

<script>
import TaskManager from './components/TaskManager.vue'

export default {
  name: 'App',
  components: {
    TaskManager
  }
}
</script>

<style scoped>
</style>
