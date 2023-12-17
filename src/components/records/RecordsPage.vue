<script setup>
</script>

<template>

  <div class="container-one">
        <div class="container-two">
        <!-- Page content -->
          <div class="records-content" style="max-width: 800px">
          <h1 class="records-header">Records of Okapi</h1>
          <div class="records-items row">
            <div class="col-md-3 text-center mb-3">
              <div class="card border-0 rounded-4 p-3 shadow records-card">
                <h4>Users registered:</h4>
                <h4>{{ usersNumber }}</h4>
              </div>
            </div>
            <div class="col-md-3 text-center mb-3">
              <div class="card border-0 rounded-4 p-3 shadow records-card">
                <h4>Timers started:</h4>
                <h4>{{ timersNumber }}</h4>
              </div>
            </div>
            <div class="col-md-3 text-center mb-3">
              <div class="card border-0 rounded-4 p-3 shadow records-card">
                <h4>Groups created:</h4>
                <h4>{{ groupsNumber }}</h4>
              </div>
            </div>
            <div class="col-md-3 text-center mb-3">
              <div class="card border-0 rounded-4 p-3 shadow records-card">
                <h4>Tasks added:</h4>
                <h4>{{ tasksNumber }}</h4>
              </div>
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
      usersNumber: '0',
      timersNumber: '0',
      groupsNumber: '0',
      tasksNumber: '0',
    };
  },
  mounted() {
    fetch('http://localhost:8080/api/public/records/users', {
      method: 'GET',
    }).then((response) => response.json())
      .then((data) => {
        this.usersNumber = data;
      })
      .catch((error) => {
        console.error('Error fetching users data:', error);
      });

    fetch('http://localhost:8080/api/public/records/timers', {
      method: 'GET',
    }).then((response) => response.json())
      .then((data) => {
        this.timersNumber = data;
      })
      .catch((error) => {
        console.error('Error fetching timers data:', error);
      });

    fetch('http://localhost:8080/api/public/records/groups', {
      method: 'GET',
    }).then((response) => response.json())
      .then((data) => {
        this.groupsNumber = data;
      })
      .catch((error) => {
        console.error('Error fetching groups data:', error);
      });

    fetch('http://localhost:8080/api/public/records/tasks', {
      method: 'GET',
    }).then((response) => response.json())
      .then((data) => {
        this.tasksNumber = data;
      })
      .catch((error) => {
        console.error('Error fetching tasks data:', error);
      });
  },
};
</script>

<style src="@/assets/colours.css"></style>
<style setup>
.records-card {
    background-color: var(--coffee-colour) !important;
    border-radius: 8px;
}
</style>
<style>
.records-content {
    width: 1000px;
    margin-left: 550px;
}

.records-header {
    margin-left: 100px;
    margin-top: 50px;
}

.records-items {
    margin-top: 100px;
    margin-left: -200px;
}
</style>
