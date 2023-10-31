<script setup>
import LoginForm from './components/LoginForm.vue';
import RegistrationForm from './components/RegistrationForm.vue';
import TimerComponent from './components/Timer.vue';
</script>

<template>
    <header>
    </header>
    <main>
        <div class="mx-auto p-2" style="width: 280px;">
            <Timer/>
        </div>
    </main>
</template>

<script>
import Timer from './components/Timer.vue'

export default {
  name: 'App',
  components: {
    Timer, // Register the Timer component here
  },
};
</script>

<style scoped>
</style>
