<template>
  <div class="custom-container">
    <p class="timer">{{ formatTime }}</p>
     <div class="progress-bar">
      <div class="progress" :style="{ width: (timer/ initialTimer) * 100 + '%' }"></div>
    </div>
    <div class="button-container">
      <button class="btn btn-primary" @click="startTimer" :disabled="isRunning">Start</button>
      <button class="btn btn-primary" @click="stopTimer" :disabled="!isRunning">Stop</button>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const initialTimer = ref(60);
const timer = ref(60);
const isRunning = ref(false);
let timerInterval = null;

function startTimer() {
  fetch('http://localhost:8080/api/timer/start', {
    method: 'POST',
  }).then(() => {
    this.isRunning = true;
  });

  if (!isRunning.value) {
    if (timer.value === 0) {
      timer.value = initialTimer.value;
    }

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
        this.isRunning = f;
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
  width: 300px;
  height: 400px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%; 
}

.button-container {
  margin-top: 20px;
}

.timer {
  color: white;
  font-family: "Comic Sans MS";
  font-size: 325%;
}

.btn {
  background-color: rgba(0, 0, 0, 0.5);
  border-color: white;
  color: white;
  margin: 0 10px;
  padding: 10px 20px;
   font-family: "Comic Sans MS";
}

.btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: white;
  color: white;
}

.btn:disabled {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: white;
  color: white;
}

.progress-bar {
  height: 10px;
  width: 85%;
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