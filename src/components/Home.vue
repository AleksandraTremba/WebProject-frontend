<script lang="ts" setup>
  // Visual components
  import Sidebar from '@/components/sidebar/Sidebar.vue';

  // Components to load during runtime
  import Login from '@/components/access/LoginForm.vue';
  import Register from '@/components/access/RegistrationForm.vue';
  import TimerContainer from '@/components/timer/Timer.vue';
  import Tasks from '@/components/tasks/TaskManager.vue';
  import Profile from '@/components/profile/Profile.vue';
  import Home from '@/components/Home.vue';
  import Groups from '@/components/groups/GroupPage.vue';
  import Records from '@/components/records/RecordsPage.vue';

  // Underlying structures
  import { Customer } from '@/models/Customer';
  import { TaskHandler } from '@/models/Tasks';
  import { HttpClient } from '@/api/HttpClient';
  import { LocalStorageManager } from '@/api/LocalStorage';

  import { ref } from 'vue';

  import type { ICustomer } from '@/models/Customer';

  // Declaring necessary functions
  let http: HttpClient = new HttpClient();
  let storage: LocalStorageManager = new LocalStorageManager();

  let customer: Customer = new Customer(http, storage);

  const tabId = ref(0);
  
  // Booleans to manipulate webapp state
  const registration = ref(false);
  const isSignedIn = ref(false);
  const isHome = ref(true);

  function changeTab(id: number) { 
    tabId.value = id; 
    isHome.value = id === 0;
  }

  function copyCustomerData(copy: Customer) {
    try {
      customer.login2(copy);
      http.injectSecurityHeader(customer.token);
      changeTab(0);
      isSignedIn.value = true;
      console.log(copy);
      console.log(customer);
    } catch (e) {
      console.log(e);
    }
  }

  function activateRegistation(value: boolean) {
    registration.value = value;
  }

  function updateUsername(value: string) {
    customer.newData = value;
    let promise: Promise<ICustomer> = customer.updateNickname();

    promise.then((result) => {
      console.log(result);
      customer.nickname = result.username;
    }, (err) => {
      console.log(err);
    });
  }

  function updatePassword(value: string) {
    customer.newData = value;
    let promise: Promise<ICustomer> = customer.updatePassword();

    promise.then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }
</script>

<template>
  <div>
    <div class="container-fluid">
      <main role="main">
          <div class="row justify-content-start">
            <div class="col-2">
              <Sidebar @change-tab="(n: number) => changeTab(n)" :isSignedIn="isSignedIn" />
            </div>
            <div class="col">
              <h1 class="text-center mt-4" v-if="isHome">Welcome back, {{ customer.nickname }}</h1>
              <TimerContainer class="ms-5 mt-5" v-if="isSignedIn" :http="http" :timerId="customer.timerId" :customerId="customer.id" :isHome="isHome" />
              <div v-if="tabId === 0">
              </div>
              <div v-if="tabId === 1 && isSignedIn">
                <Tasks :http="http" :customerId="customer.id" />
              </div>
              <div v-if="tabId === 2 && isSignedIn">
                <Groups :http="http" :customer="customer" :groupId="customer.groupId" />
              </div>
              <div v-if="tabId === 3">
                <Records :http="http" />
              </div>
              <div v-if="tabId === 4 && !isSignedIn" class="m-5">
                <Login v-if="!registration" :http="http" v-bind:storage="storage" @login-success="(data: Customer) => copyCustomerData(data)" @register="() => activateRegistation(true)"/>
                <Register v-if="registration" :http="http" v-bind:storage="storage" @registration-success="() => activateRegistation(false)"/>
              </div>
              <div v-if="tabId === 4 && isSignedIn">
                <!--- MUST REMAKE TO USE LOCAL DATA --->
                <Profile :http="http" :customer="customer" @update-username="(data: string) => updateUsername(data)" @update-password="(data: string) => updatePassword(data)" />
              </div>
            </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style src="@/assets/colours.css"></style>
<style>
:root {
    background-color: var(--light-colour);
}
</style>