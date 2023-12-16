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
let interval: any = null;

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
  const minutes = Math.floor(timer.runningTime / 60);
  const seconds = timer.runningTime % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

</script>

<style>
.custom-container {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  height: 500px;
  min-width: 300px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3); 
}

.timer-name {
  color: white;
  font-size: 1.5rem; 
margin-bottom: 100px;
}

.timer {
  color: white;
}

.button-container {
  margin-top: 20px;
}

.timer-time {
  color: white;
  font-size: 325%;
}

.btn {
  background-color: rgba(0, 0, 0, 0.5);
  border-color: white;
  color: white;
  margin: 0 10px;
  padding: 10px 20px;
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

.mainpage-nav-item {
  margin-bottom: 10px;
  margin-right: auto;
  color: white;
}

.timer-button {
  margin-left: 135px;
}
</style>
