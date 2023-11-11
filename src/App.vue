<script setup>
import LoginForm from './components/LoginForm.vue';
import RegistrationForm from './components/RegistrationForm.vue';
</script>

<template>
    <header>
    </header>
    <main>
        <div class="mx-auto p-2" style="width: 280px;">
            <LoginForm />
            <br>
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
