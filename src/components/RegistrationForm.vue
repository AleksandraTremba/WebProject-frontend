<script setup lang="ts">
import { ref } from 'vue';
import { Customer } from '@/models/Customer.ts';

let customer: Customer = new Customer();
let isTaken: bool = ref(null);

function confirmRegistration() {
	var promise: Promise<bool> = customer.register();
	promise.then((result) => {
		console.log(result);
		if (result != '')
			isTaken.value = false;
		else
			isTaken.value = true;
	}, (err) => {
		console.log(err);
	});
}

</script>

<template>
    <div class="registration-form">
        <input type="text" class="form-control mb-2" placeholder="Nickname" v-model="customer.nickname"/>
        <input type="password" class="form-control mb-2" placeholder="Password" v-model="customer.password"/>
        <button type="button" class="btn btn-primary w-100" :class="{'btn-warning': isTaken}" @click="confirmRegistration">Register</button>
        <div class="text-center">
            <p v-if="isTaken == false">Success!</p>
            <p v-if="isTaken" class="invalid ">This username is already taken!</p>
        </div>
    </div>
</template>

<style setup>
.invalid {
    color: var(--bs-danger-text-emphasis);
}
</style>
