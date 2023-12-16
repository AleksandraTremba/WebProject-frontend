<script lang="ts" setup>

import { ref } from 'vue';
import { Customer } from '@/models/Customer.ts';

let customer: Customer = new Customer();
let isLogged = ref(null);

function confirmLogin() {
	customer.login();
	isLogged.value = customer.isLogged;
}

</script>

<template>
    <div class="login-form">
        <input type="text" class="form-control mb-2" placeholder="Nickname" v-model="customer.nickname" />
        <input type="password" class="form-control mb-2" placeholder="Password" v-model="customer.password"/>
        <button type="button" class="btn btn-primary w-100" :class="{'btn-danger': !isLogged}" @click="confirmLogin">Login</button>
        <div class="text-center">
            <p v-if="isLogged === true">Success!</p>
            <p v-if="isLogged === false" class="invalid ">Invalid credentials!</p>
        </div>
    </div>
</template>

<style setup>
.invalid {
    color: var(--bs-danger-text-emphasis);
}
</style>
