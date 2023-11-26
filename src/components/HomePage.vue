<template>

  <div>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item text-center">
              <h1 class="okapi_menu"> Okapi </h1>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Tasks</a>
              </li>

            </ul>
          </div>
        </nav>

        <!-- Page content -->
        <main role="main" class="col-md-2 ml-sm-auto col-lg-10 px-4 ">
          <div class="content">
               <div class="timer-container">
                  <p class="timer">Timer</p>
                </div>
                <div class="tasks-container">
                  <p class="tasks">Tasks</p>
                </div>
                <div class="group-container">
                  <p class="grouptasks">Group tasks</p>
                </div>
          </div>
        </main>
      </div>
    </div>
  </div>

</template>

<script>

</script>

<style>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 20px;
  background-color: #FAF8F8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

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

.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 200px;
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
}

.tasks {
  color: white;
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
}

.grouptasks {
  color: white;
}

</style>