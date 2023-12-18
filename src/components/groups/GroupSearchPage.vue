<script setup>
</script>

<template>
  <div class="container-fluid">
    <div class="row">
     <main role="main" class="" style="padding-left: 450px; padding-top: 20px">
      <div class="group-search-content">
        <h2 class="group-search-title">You don't belong to a group right now.</h2>
        <button class="btn btn-primary">Create a group</button>
        <label class="enter-group" for="inputTime">Find a group:</label>
        <input class="input-group" type="text" id="inputTime" v-model="inputTime" />
        <button class="btn btn-primary" @click="submitTime">Search</button>
        </div>
    </main>
    </div>
  </div>
</template>
  
  <script>
  </script>
  
  <style>
  .group-search-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  width: 700px;
}

.group-search-title {
margin-bottom: 50px;
}

.enter-group {
    margin-top: 50px;
    margin-bottom: 10px;
}

.input-group {
    margin-bottom: 20px;
}
  </style>