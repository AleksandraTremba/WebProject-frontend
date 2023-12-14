<template>
  <div class="custom-container">
	<p class="timer">{{ formatTime }}</p>
	<div class="progress-bar">
      <div class="progress" :style="{ width: percentageTime + '%' }"></div>
    </div>
	
	<div class="button-container">
      <button class="btn btn-primary" @click="startTimer" :disabled="isRunning">Start</button>
      <button class="btn btn-primary" @click="stopTimer" :disabled="!isRunning">Stop</button>
    </div>
		
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Timer } from '@/models/Timer.ts';

let timer: Timer = new Timer();
timer.create();

const percentageTime = ref(100);
const runningTime = ref(null);
const isRunning = ref(false);
let interval = null;

function startTimer() {
	if (timer.isPaused) {
		timer.start();
		isRunning.value = true;
		runningTime.value = timer.runningTime;
		
		interval = setInterval(() => {
			timer.runningTime--;
			runningTime.value = timer.runningTime;
			percentageTime.value = timer.timeLeftAsPercentage();
			if (timer.runningTime === 0)
				stopTimer();
		}, 1000);
	}
}

function stopTimer() {
	timer.pause();
	isRunning.value = false;
	clearInterval(interval);
}

const formatTime = computed(() => {
  const minutes = Math.floor(runningTime.value / 60);
  const seconds = runningTime.value % 60;
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

.timer-time {
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
