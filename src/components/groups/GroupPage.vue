<script setup lang="ts">
import Users from './UsersContainer.vue';
import { Customer } from '@/models/Customer';
import { HttpClient } from '@/api/HttpClient';
import { ref, reactive } from 'vue';

const url: string = "/groups";

const emit = defineEmits(['joinedGroup', 'createdGroup']);
const props = defineProps({
  http: HttpClient,
  customer: Customer,
  groupId: Number,
});

const groupStatus = ref('none');

let id: Number = 0;
let name: string = "Your group";
let members: Array<string> = reactive(new Array());
let notInGroup: boolean = props.groupId === null || props.groupId === undefined;

let dummyName: string = "";

console.log(props.group);
console.log(notInGroup);

if (!notInGroup)
  loadGroup();

function loadGroup() {
  let promise: Promise<T> = props.http.get(null, url + "/" + props.groupId);
  promise.then((result) => {
    console.log(result);
    id = result.id;
    name = result.name;
  }, (err) => {
    alert("Something went wrong...");
    console.log(err);
  });

  let promise2: Promise<T> = props.http.get(null, url + "/members?groupId=" + props.groupId);
  promise2.then((result) => {
    console.log(result);
    result.forEach((el) => {
      members.push(el.username);
    });
  }, (err) => {
    alert("Oops, something went wrong!");
    console.log(err);
  });
}

function joinGroup() {
  let data: string = props.customer.jsonifyPub();
  const dataObj = {
    headers: {
      'Content-Type': 'application/json',
    },
    data
  }

  let promise: Promise<T> = props.http.post(dataObj, url + "/" + dummyName + "/add");
  promise.then((result) => {
    console.log(result);
    emit('joinedGroup', result.id);
    notInGroup = false;
    loadGroup();
  }, (err) => {
    alert("Could not join the group :(");
    console.log(err);
  })
}

function createGroup() {
  let data: string = props.customer.jsonifyPub();
  const dataObj = {
    headers: {
      'Content-Type': 'application/json',
    },
    data
  }

  let promise: Promise<T> = props.http.put(dataObj, url + "/?groupName=" + dummyName);
  promise.then((result) => {
    console.log(result);
    emit('createdGroup', result.id);
    notInGroup = false;
    loadGroup();
  }, (err) => {
    alert("Could not join the group :(");
    console.log(err);
  })
}

</script>

<template>
  <div class="container">
    <div class="group-container p-4 shadow">
      <p class="fs-1">{{ name }} (#{{ id }})</p>
      <div v-if="notInGroup">
        <p class="fs-5">
          It looks like you are not part of a group! Would you like to join one?
          Just enter the group's ID your friends have shared with you, or create
          your own!
        </p>
        <div class="d-flex flex-row mb-2">
          <button type="button" class="btn btn-primary btn-animated flex-fill me-2" @click="groupStatus = 'join'">Join</button>
          <button type="button" class="btn btn-primary btn-animated flex-fill ms-2" @click="groupStatus = 'create'">Create</button>
        </div>
        <div class="form-floating" v-if="groupStatus === 'create'">
          <input type="text" class="form-control group-input" id="floatingInputGroup1" placeholder="Name your amazing group!" v-model="dummyName" @keypress.enter="createGroup">
          <label for="floatingInputGroup1">Name your amazing group!</label>
        </div>
        <div class="form-floating" v-if="groupStatus === 'join'">
          <input type="text" class="form-control group-input" id="floatingInputGroup1" placeholder="Enter group ID" v-model="dummyName" @keypress.enter="joinGroup">
          <label for="floatingInputGroup1">Enter group name here!</label>
        </div>
      </div>
      <div v-if="!notInGroup">
        <div class="member-card px-3 py-2 shadow-sm mb-3" v-for="member in members">
          <div class="fs-4 d-flex justify-content-center align-items-center flex-row">
            <i class="bi bi-person-workspace pe-2"></i>
            <p class="m-0">{{ member }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/assets/colours.css"></style>
<style>
.group-container {
  max-width: 512px;
  background-color: var(--coffee-colour) !important;
  border-radius: 8px;
}

.group-container-sm {
  max-width: 312px;
}

.group-input {
  border-radius: 16px;
}

.member-card {
  background-color: var(--darkest-colour);
  transition: box-shadow 1s;
  border-radius: 8px;
}

.btn-animated {
  border-radius: 6px;
  transition: border-radius 0.3s;
}

.btn-animated:hover {
  border-radius: 24px;
}

.member-card:hover {
  box-shadow: var(--bs-box-shadow) !important;
}
</style>