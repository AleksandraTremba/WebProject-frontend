<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { HttpClient } from '@/api/HttpClient';

const props = defineProps({
  http: HttpClient,
  groupId: Number,
});

const members: Array<string> = reactive(new Array());
const url: string = "/groups";

let promise: Promise<T> = props.http.get(null, url + "/?groupId=" + props.groupId);
promise.then((result) => {
  console.log(result);
}, (err) => {
  console.log(err);
})

</script>

<template>
 <div class="col-md-3 user-container align-self-start">
        <h2 class="users-name">Users</h2>
        <div class="user-list text-center">
          <ul class="nav flex-column">
            <li class="users-nav-item text-center">
              <p class="one-user"> You </p>
            </li>
            <li class="users-nav-item" v-for="member in members">
              <p class="one-user"> {{ member }} </p>
            </li>
          </ul>
        </div>
      </div>
</template>

<style>
.user-container {
   background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  height: 700px;
   max-width: 300px;
  min-width: 300px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 50px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.3); 
}

.one-user {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 20px;
  width: 200px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.3); 
}

.users-nav-item {
  margin-bottom: 10px;
  margin-right: auto;
  color: white;
  display: flex;
}

.users-name {
  color: white;
  font-size: 1.5rem; 
  margin-bottom: 100px;
  margin-left: 70px;
}
</style>
