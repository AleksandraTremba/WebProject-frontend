<script setup lang="ts">
import { ref } from 'vue';
import { Customer } from '@/models/Customer.ts';
import { HttpClient } from '@/api/HttpClient.ts';
import { LocalStorageManager } from '@/api/LocalStorage.ts';

import type { ICustomer } from '@/models/Customer';

const props = defineProps({
    http: HttpClient,
    storage: LocalStorageManager
});

const emit = defineEmits(['registrationSuccess']);
let customer: Customer = new Customer(props.http, props.storage);

let isTaken = ref(null);

function confirmRegistration() {
    var promise: Promise<ICustomer> = customer.register();

    promise.then((result) => {
        emit('registrationSuccess');
    }, (err) => {
        console.log(err);
        isTaken.value = true;
    })
}

</script>

<template>
    <div class="register">
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
                <button type="button" class="btn btn-primary w-100 mx-0" :class="{'btn-warning': isTaken}" @click="confirmRegistration">
                    <p v-if="isTaken === null">Register</p>
                    <p v-if="isTaken === true" class="invalid">This username is already taken!</p>
                </button>
            </form>
        </div>
    </div>
</template>

<style src="@/assets/colours.css"></style>
<style setup>
.register {
    background-color: var(--coffee-colour) !important;
    border-radius: 8px;
}

form p {
    margin: 0;
}

.invalid {
    color: var(--bs-danger-text-emphasis);
}
</style>
