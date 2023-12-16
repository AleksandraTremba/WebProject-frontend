<script setup>
  import Sidebar from '../components/Sidebar.vue';
  import TopTimer from '../components/TopTimer.vue';
  import Users from '../components/UsersContainer.vue';
  import Tasks from '../components/TaskManager.vue';
</script>

<template>
  <div class="container-fluid">
   <Sidebar />
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