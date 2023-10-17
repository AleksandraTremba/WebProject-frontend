<script setup>
import LoginForm from './components/LoginForm.vue';
import RegistrationForm from './components/RegistrationForm.vue';
import TaskManager from './components/TaskManager.vue'
</script>

<template>
    <header>
    </header>
    <main>
      <TaskManager></TaskManager>
    </main>
</template>

<script>

export default {
  name: 'App',
  components: {
    TaskManager
  }
}
</script>

<style scoped>
</style>
