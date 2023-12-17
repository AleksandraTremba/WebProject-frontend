<script setup lang="ts">
import { Customer } from '@/models/Customer.ts';
import { HttpClient } from '@/api/HttpClient.ts';
import { LocalStorageManager } from '@/api/LocalStorage.ts';

import type { ICustomer } from '@/models/Customer';

const props = defineProps({
    http: HttpClient,
    storage: LocalStorageManager
});

const emit = defineEmits(['loginSuccess', 'register']);
let customer: Customer = new Customer(props.http, props.storage);

function confirmLogin() {
	var promise: Promise<ICustomer> = customer.login();

    promise.then((result) => {
        customer.id = result.id;
        customer.timerId = result.timerId;
        customer.token = result.token;

        emit('loginSuccess', customer);
    }, (err) => {
        console.log(err);
    })
}

function wantToRegister() {
    emit('register');
}

</script>

<template>
    <div class="login">
        <div class="container p-5">
            <form>
                <div class="mb-3">
                    <label for="usernameForm" class="form-label">Username</label>
                    <input type="text" class="form-control" id="usernameForm" placeholder="Enter your username..." v-model="customer.nickname">
                </div>
                <div class="mb-3">
                    <label for="passwordForm" class="form-label">Password</label>
                    <input type="password" class="form-control" id="passwordForm" placeholder="Enter your password..." v-model="customer.password">
                </div>
                <button type="button" class="btn btn-primary w-100 mx-0" @click="confirmLogin">Login</button>
                <div class="w-100 text-center">
                    <a href="#" @click="wantToRegister">Don't have an account?</a>
                </div>
            </form>
        </div>
    </div>
</template>

<style src="@/assets/colours.css"></style>
<style setup>
.login {
    background-color: var(--coffee-colour) !important;
    border-radius: 8px;
}
</style>
