<template>
  <div class="custom-container">
    <h2 class="timer-name">Timer</h2>
            <p class="timer">00:00</p>
            <div class="progress-bar">
            <div class="progress" :style="{ width: (timer/ initialTimer) * 100 + '%' }"></div>
            </div>
            <div class="button-container">
              <button class="btn btn-primary" @click="startTimer" :disabled="isRunning">Start</button>
              <button class="btn btn-primary" @click="stopTimer" :disabled="!isRunning">Stop</button>
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

.timer {
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