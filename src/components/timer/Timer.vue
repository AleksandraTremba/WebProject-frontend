<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { Timer } from '@/models/Timer.ts';
import { HttpClient } from '@/api/HttpClient';

const props = defineProps({
  http: HttpClient,
  timerId: Number,
  customerId: Number,
  isHome: Boolean,
});

let timer: Timer = reactive(new Timer(props.http));

const percentageTime = ref(100);
const runningTime = ref(null);
const isRunning = ref(false);
const wantEditTime = ref(false);

let interval: any = null;
let initialTime: number = 60;

function startTimer() {
  if (timer.isPaused) {
    timer.id = props.timerId;

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

function buttonPresed() {
  if (isRunning.value)
    stopTimer();
  else
    startTimer();
}

function resetTimer() {
  console.log(props.customerId);
  console.log(timer.customerId);
  timer.customerId = props.customerId;
  console.log(timer.customerId);
  timer.reset();
  interval.value = timer.runningTime;
}

function editTime() {
  timer.initialTime = initialTime;
  timer.runningTime = timer.initialTime;
}

const minutes = computed(() => {
  return Math.floor(timer.runningTime / 60);
});

const seconds = computed(() => {
  const seconds = timer.runningTime % 60;
  return `${seconds < 10 ? '0' : ''}${seconds}`;
});

</script>

<template>
  <div class="container text-center">
    <div class="timer d-flex flex-column p-4" :class="{'timer': props.isHome, 'timer-sm': !props.isHome}">
      <div class="fs-1" v-if="!wantEditTime" @dblclick="wantEditTime = true">
        <p>{{ minutes }}:{{ seconds }}</p>
      </div>
      <div class="mb-3" v-if="wantEditTime">
        <label for="time-input" class="form-label">Enter time in seconds</label>
        <input type="text" class="form-control" id="time-input" placeholder="Enter your time..." v-model="initialTime" @keyup.enter="wantEditTime = false" @keypress.enter="editTime">
      </div>
  	  <div class="progress shadow-lg bg-body-tertiary" role="progressbar" aria-valuenow="{percentageTime}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" :style="{ width: percentageTime + '%' }"></div>
      </div>
  	
  	  <div class="button-container mt-4">
        <button class="btn btn-lg btn-primary me-2" @click="buttonPresed" :class="{'rounded-circle': !isRunning, 'rounded is-running-btn': isRunning}">
          <i class="bi" :class="{'bi-play-fill': !isRunning, 'bi-pause-fill': isRunning}"></i>
        </button>
        <button class="btn btn-lg btn-primary" @click="resetTimer" :disabled="isRunning">Reset</button>
      </div>		
    </div>
  </div>
</template>


<style src="@/assets/colours.css"></style>
<style setup>
  .is-running-btn {
    width: 60px;
  }

  .timer {
    max-width: 512px;
    background-color: var(--coffee-colour) !important;
    border-radius: 8px;
    box-shadow: var(--bs-box-shadow-sm) !important;
    transition: box-shadow 1s;
  }

  .timer-sm {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: 1rem;
    margin-right: 1rem;
    max-width: 256px;

    box-shadow: var(--bs-box-shadow-sm);
    transition: box-shadow 1s;
  }

  .timer:hover {
    box-shadow: var(--bs-box-shadow) !important;
  }

  .timer-sm:hover { 
    box-shadow: var(--bs-box-shadow) !important;
  }

  .btn-primary {
    color: var(--light-colour);
    background-color: var(--darker-green-colour);
    border: none;
  }

  .btn-primary:hover {
    background-color: var(--dark-green-colour);
  }

  .btn-primary:focus {
    background-color: var(--dimmed-green-colour);
  }

  .btn-primary:disabled {
    background-color: var(--dimmed-green-colour);
  }

  .progress-bar {
    background-color: var(--blue-colour);
  }
</style>
