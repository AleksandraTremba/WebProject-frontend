<template>

  <div>
    <div class="container-fluid">
        <!-- Page content -->
        <main role="main" class="col-md-2">
          <div class="d-flex align-items-center">
               <div class="timer-container">
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
                <div class="tasks-container">
                  <h2 class="tasks-name">Tasks</h2>
                  <div class="tasks-list">
                    <ul class="nav flex-column">
                        <li class="mainpage-nav-item text-center">
                            <p class="one-task"> First task </p>
                        </li>
                        <li class="mainpage-nav-item">
                            <p class="one-task"> Second task </p>
                        </li>
                        <li class="mainpage-nav-item">
                            <p class="one-task"> Third task </p>
                        </li>
                        <li class="mainpage-nav-item">
                            <p class="one-task"> Fourth task </p>
                        </li>
                        <li class="mainpage-nav-item">
                            <p class="one-task"> Fifth task </p>
                        </li>
                    </ul>
                </div>
                </div>
                <div class="group-container">
                  <h2 class="grouptasks-name">Group tasks</h2>
                  <div class="grouptasks-list">
                    <ul class="nav flex-column">
                       <li class="mainpage-nav-item text-center">
                            <p class="one-task"> First task </p>
                        </li>
                        <li class="mainpage-nav-item">
                            <p class="one-task"> Second task </p>
                        </li>
                        <li class="mainpage-nav-item">
                            <p class="one-task"> Third task </p>
                        </li>
                        <li class="mainpage-nav-item">
                            <p class="one-task"> Fourth task </p>
                        </li>
                        <li class="mainpage-nav-item">
                            <p class="one-task"> Fifth task </p>
                        </li>
                    </ul>
                </div>
                </div>
          </div>
        </main>

    </div>
  </div>

</template>

<script>

</script>

<style>

.nav-item {
  margin-bottom: 10px;
}

.nav-link {
  color: black;
}

.nav-link.active {
  background-color: #04AA6D;
  color: white;
}

.nav-link:hover:not(.active) {
  background-color: #C7C1BF;
  color: white;
}


/* Insert true timer code */
.timer-container {
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

}

.timer-name {
  color: white;
  font-size: 1.5rem; 
margin-bottom: 100px;
}

.timer {
  color: white;
}

/* Insert true tasks code */
.tasks-container {
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
  padding-left: 50px;
}

.tasks-name {
  color: white;
  font-size: 1.5rem; 
  margin-bottom: 100px;
  margin-left: 70px;
}


/* Insert true group tasks code */
.group-container {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  height: 500px;
  min-width: 300px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
}

.grouptasks-name {
  color: white;
  font-size: 1.5rem; 
margin-bottom: 100px;
margin-left: 50px;
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


</style>
