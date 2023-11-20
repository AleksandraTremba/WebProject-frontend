<script setup lang="ts">

import { ref } from 'vue';
import { Customer } from '@/models/Customer.ts';

let customer: Customer = new Customer();

let isLogged: bool = ref(null);

function confirmLogin() {
	var promise: Promise<bool> = customer.login();
	promise.then((result) => {
		isLogged.value = result;
	}, (err) => {
		console.log(err);
	});
}

function retrieveData() {
	var promise: Promise<TCustomer> = customer.retrieve();
	promise.then((result) => {
		console.log(result);
	}, (err) => {
		console.log(err);
	});
}

</script>

<template>
    <div class="login-form">
        <input type="text" class="form-control mb-2" placeholder="Nickname" v-model="customer.nickname" />
        <input type="password" class="form-control mb-2" placeholder="Password" v-model="customer.password"/>
        <button type="button" class="btn btn-primary w-100" :class="{'btn-danger': isLogged == false}" @click="confirmLogin">Login</button>
        <div class="text-center">
            <p v-if="isLogged == true">Success!</p>
            <p v-if="isLogged == false" class="invalid ">Invalid credentials!</p>
        </div>
		<button type="button" class="btn btn-primary w-100" @click="retrieveData">Get Data</button>
    </div>
</template>

<style setup>
.invalid {
    color: var(--bs-danger-text-emphasis);
}
</style>
