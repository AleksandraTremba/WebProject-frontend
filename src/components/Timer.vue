<template>
  <div class="custom-container">
    <p class="timer">{{ timer }}</p>
    <div class="button-container">
      <button class="btn btn-primary" @click="startTimer" :disabled="isRunning">Start</button>
      <button class="btn btn-primary" @click="stopTimer" :disabled="!isRunning">Stop</button>
      <button class="btn btn-primary" @click="resetTimer">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRunning: false,
      timer: '00:00',
    };
  },
  methods: {
    startTimer() {
      fetch('http://localhost:8080/api/timer/start', {
        method: 'POST',
      }).then(() => {
        this.isRunning = true;
      });
    },
    stopTimer() {
      fetch('http://localhost:8080/api/timer/stop', {
        method: 'POST',
      }).then(() => {
        this.isRunning = false;
      });
    },
    resetTimer() {
      fetch('http://localhost:8080/api/timer/reset', {
        method: 'POST',
      }).then(() => {
        this.isRunning = false;
        this.timer = '00:00';
      });
    },
    updateTimer() {
      fetch('http://localhost:8080/api/timer', {
        method: 'GET',
      })
          .then((response) => response.text())
          .then((data) => {
            this.timer = data;
          });
    },
  },
  mounted() {
    // Periodically update the timer value
    setInterval(this.updateTimer, 1000);
  },
};
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
</style>