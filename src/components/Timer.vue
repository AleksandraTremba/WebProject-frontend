<template>
  <div class="custom-container">
    <p class="timer">{{ formatTime }}</p>
     <div class="progress-bar">
      <div class="progress" :style="{ width: (timer / 60) * 100 + '%' }"></div>
    </div>
    <div class="button-container">
      <button class="btn btn-primary" @click="startTimer" :disabled="isRunning">Start</button>
      <button class="btn btn-primary" @click="stopTimer" :disabled="!isRunning">Stop</button>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const timer = ref(60);
const isRunning = ref(false);
let timerInterval = null;

function startTimer() {
  fetch('http://localhost:8080/api/timer/start', {
          method: 'POST',
        }).then(() => {
          this.isRunning = true;
        });


  if (!isRunning.value && timer.value > 0) {
    timerInterval = setInterval(() => {
      timer.value--;
      if (timer.value === 0) {
        stopTimer();
      }
    }, 1000);
    isRunning.value = true;
  }
}

function stopTimer() {
  fetch('http://localhost:8080/api/timer/start', {
        method: 'POST',
      }).then(() => {
        this.isRunning = true;
      });

  if (isRunning.value) {
    clearInterval(timerInterval);
    isRunning.value = false;
  }
}

const formatTime = computed(() => {
  const minutes = Math.floor(timer.value / 60);
  const seconds = timer.value % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});
</script>

<style>
.custom-container {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
}

.button-container {
  margin-top: 20px;
}

.timer {
  color: white;
}

.btn {
  border-color: white;
  color: white;
}

.progress-bar {
  height: 10px;
  width: 100%;
  background-color: black;
  border-radius: 5px;
  margin-top: 10px;
}

.progress {
  height: 100%;
  background-color: white; 
  border-radius: 5px;
  transition: width 1s linear;
}
</style>