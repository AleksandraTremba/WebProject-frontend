<template>
    <div class="">
        <div class="top-timer-container">
            <div class="top-timer-content d-flex justify-content-center">
                  <button class="top-btn btn-primary" @click="startTimer" :disabled="isRunning">Start</button>
                    <div class="top-timer-progress d-flex align-items-center">
                      <div class="col-4 d-flex justify-content-center">
                        <p class="top-timer mb-1"> 00:00 </p>
                      </div>
                      <div class="second-progress">
                      <div class="top-progress-bar">
                      <div class="top-progress" :style="{ width: (timer/ initialTimer) * 100 + '%' }"></div>
                      </div>
                      </div>
                    </div>
                  <button class="top-btn btn-primary" @click="stopTimer" :disabled="!isRunning">Stop</button>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style>
.top-timer-container {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0;
    margin-top: 0px;
    height: 50px;
    padding: 5px;
    width: 100%;
    }

.top-timer-content {
  margin-left: 150px;
}

.top-timer {
  color: white;
  font-size: 100%;
}

.top-btn {
 background-color: rgba(0, 0, 0, 0.5);
  border-color: white;
  color: white;
  margin: 0 10px;
  padding: 1px 10px;
  height: 40px;

}

.top-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: white;
  color: white;
}

.top-btn:disabled {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: white;
  color: white;
}

.top-progress-bar {
  height: 5px;
  width: 100px;
  background-color: black;
  border-radius: 5px;
}

.top-progress {
  height: 100%;
  background-color: white; 
  border-radius: 5px;
  transition: width 1s linear;
}

.top-content {
    flex-direction: row;
}

.top-timer-progress {
    flex-direction: column;
    width: 100px;
}
.top-row {
  --bs-gutter-x: 0mm;
}
</style>
