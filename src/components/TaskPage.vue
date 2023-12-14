<script setup>
  import Sidebar from '../components/Sidebar.vue';
  import TopTimer from '../components/TopTimer.vue';
  import Tasks from '../components/TaskManager.vue';
</script>

<template>
  <div class="container-fluid">
   <Sidebar />
   <TopTimer />
    <div class="row">
     <main role="main" class="col-12 col-md-9" style="padding-left: 500px; padding-top: 20px">
     <div class="d-flex align-items-center">
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