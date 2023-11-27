<template>
    <div class="fixed-top">
        <div class="timer-container">
            <div class="d-flex justify-content-center">
                <div class="content">
                  <button class="btn btn-primary" @click="startTimer" :disabled="isRunning">Start</button>
                    <div class="timer-progress">
                      <div class="col-4 d-flex justify-content-center">
                        <p class="timer mb-1"> 00:00 </p>
                      </div>
                      <div class="second-progress col-4 d-flex justify-content-center">
                      <div class="progress-bar">
                      <div class="progress" :style="{ width: (timer/ initialTimer) * 100 + '%' }"></div>
                      </div>
                      </div>
                    </div>
                  <button class="btn btn-primary" @click="stopTimer" :disabled="!isRunning">Stop</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style>
.timer-container {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0;
    margin-top: 0px;
    height: 50px;
    padding: 5px;
    min-width: 100%;
    }

.timer {
  color: white;
  font-family: "Comic Sans MS";
  font-size: 100%;
}

.btn {
 background-color: rgba(0, 0, 0, 0.5);
  border-color: white;
  color: white;
  margin: 0 10px;
  padding: 1px 10px;
  height: 40px;
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
  width: 500px;
  background-color: black;
  border-radius: 5px;
}

.progress {
  height: 100%;
  background-color: white; 
  border-radius: 5px;
  transition: width 1s linear;
}

.content {
    flex-direction: row;
}

.timer-progress {
    flex-direction: column;
    width: 100px;
}
.row {
  --bs-gutter-x: 0mm;
}
</style>
