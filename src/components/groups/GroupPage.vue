<script setup>
  import TopTimer from '../timer/TopTimer.vue';
  import Users from './UsersContainer.vue';
  import Tasks from '../tasks/TaskManager.vue';
</script>

<template>
  <div class="container-fluid">
   <TopTimer />
    <div class="row">
     <main role="main" class="col-12 col-md-9" style="padding-left: 400px; padding-top: 20px">
     <div class="d-flex align-items-center">
     <Users />
      <Tasks />
      </div>
      </main>
    </div>
  </div>
</template>
  
  <script>
  </script>
  
  <style scoped>
  </style>