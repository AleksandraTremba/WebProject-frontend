<script setup>
  import TopTimer from '../timer/TopTimer.vue';
  import Tasks from './TaskManager.vue';
</script>

<template>
  <div class="container-fluid">
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