<script lang="ts" setup>
import { ref } from 'vue';
import { HttpClient } from '@/api/HttpClient';

const props = defineProps({
  http: HttpClient,
});

const usersNumber = ref(0);
const timersNumber = ref(0);
const groupsNumber = ref(0);
const tasksNumber = ref(0);

const url: string = "/public/records/";

// Getting all data at once
let promise: Promise<T> = props.http.get(null, url);
promise.then((result) => {
  console.log(result);
  usersNumber.value = result.numberOfCustomers;
  timersNumber.value = result.numberOfTimers;
  groupsNumber.value = result.numberOfGroups;
  tasksNumber.value = result.numberOfTasks;
}, (err) => {
  alert("Something has happened to our server...")
  console.log(err);
})
</script>
  
<template>

  <div>
  <div class="container-one">
        <div class="container-two">
        <!-- Page content -->
          <div class="records-content" style="max-width: 800px">
          <h1 class="records-header">Records of Okapi</h1>
          <div class="records-items d-flex align-items-center">
            <div class="records-users col-md-3 align-self-start text-center">
               <h4>Users registered:</h4>
               <h4>{{usersNumber}}</h4>
            </div>
            <div class="records-timers col-md-3 align-self-start text-center">
               <h4>Timers started:</h4>
               <h4>{{timersNumber}}</h4>
            </div>
            <div class="records-groups col-md-3 align-self-start text-center">   
               <h4>Groups created:</h4>
               <h4>{{groupsNumber}}</h4>
            </div>
            <div class="records-tasks col-md-3 align-self-start text-center">
               <h4>Tasks added:</h4>
               <h4>{{tasksNumber}}</h4>
            </div>
            </div>
          </div>
          </div>
        </div>
  </div>

</template>

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
