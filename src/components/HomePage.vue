<script setup>
  import Sidebar from '../components/Sidebar.vue';
  import Timer from '../components/Timer.vue';
  import TasksContainer from '../components/TasksContainer.vue';
  import GroupTaskContainer from '../components/GroupTaskContainer.vue';
</script>

<template>
  <div>
    <div class="container-fluid">
      <Sidebar />
      <!-- Page content -->
      <main role="main" class="col-md-2" style="padding-left: 300px;">
        <div class="d-flex align-items-center">
           <Timer />
          <TasksContainer />
          <GroupTaskContainer />
          </div>
      </main>
      <div style="margin-left: 300px">
       <div class="timer-button"  @click="openTimerPopup">
        <img src="src\assets\menu.png" style="width: 30px; margin-top:10px">
        </div>
        <div class="popup d-flex justify-content-center" v-if="isPopupOpen">
        <div class="popup-content">
          <label class="enter-time" for="inputTime">Enter time:</label>
          <input class="input-time" type="text" id="inputTime" v-model="inputTime" />
          <button class="btn btn-primary" @click="submitTime">Submit</button>
        </div>
      </div>
    </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      isPopupOpen: false,
      inputTime: "",
    };
  },
  methods: {
    openTimerPopup() {
      this.isPopupOpen = true;
    },
    closeTimerPopup() {
      this.isPopupOpen = false;
    },
    submitTime() {
      const parsedInputTime = parseInt(this.inputTime, 10);

      if (isNaN(parsedInputTime) || parsedInputTime <= 0) {
        alert("Please, enter a positive number of seconds.");
        return;
      }

      this.closeTimerPopup();
    },
  },
};
</script>

<style>

.popup {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  height: 200px;
  width: 300px;
  margin-right: 20px;
  display: flex;
  justify-content: flex-center;
  align-items: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3); 
}

.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
}
.input-time {
  margin-bottom: 10px;
}

.enter-time {
  margin-bottom: 10px;
  color: white;
}
</style>
