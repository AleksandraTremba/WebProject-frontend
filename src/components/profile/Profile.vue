<script setup lang="ts">

import { ref } from 'vue';
import { Customer } from '@/models/Customer.ts';
import { HttpClient } from '@/api/HttpClient';

const props = defineProps({
	http: HttpClient,
	customer: Customer,
});
const emit = defineEmits(['updateUsername', 'updatePassword']);

const url: string = '/public/affirmation';
let response = ref("Nothing here");
let promise: Promise<T> = props.http.get(null, url);

let newData: string = '';

const editProfile = ref(false);
const editType = ref(0);

const options = ref([
	{ value: null, text: 'Select the type' },
	{ value: 1, text: 'Username', },
	{ value: 2, text: 'Password', }
]);

promise.then((result) => {
	console.log(result)
	response.value = result;
}, (err) => {
	response.value = "Oops, nothing to see here :(( ";
	console.log(err);
});

function updateUsername() {
	emit('updateUsername', newData);
}

function updatePassword() {
	emit('updatePassword', newData);
}

</script>

<template>
	<div class="container d-flex flex-row justify-content-center">
		<div class="card border-0 rounded-4 p-3 shadow profile-card">
			<div class="d-flex flex-column">
				<div class="customer-picture mb-2">
				</div>
				<div class="customer-nickname">
					<p class="fs-3 fw-bold text-secondary">{{ props.customer.nickname }}</p>
				</div>
				<div class="customer-biography">
					<p>{{ response }}</p>
				</div>
				<div class="" v-if="!editProfile">
					<button class="btn btn-primary" @click="editProfile = true">Edit Profile</button>
				</div>
				<div class="" v-if="editProfile">
					<select class="form-select" v-model="editType">
					  <option v-for="option in options" :value="option.value">
					    {{ option.text }}
					  </option>
					</select>
					<div v-if="editType === 1">
						<label for="time-input" class="form-label">Enter new username</label>
        				<input type="text" class="form-control" id="time-input" placeholder="Enter new username" v-model="newData" @keypress.enter="updateUsername">
					</div>
					<div v-if="editType === 2">
						<label for="time-input" class="form-label">Enter new password</label>
        				<input type="password" class="form-control" id="time-input" placeholder="Enter new password" v-model="newData" @keypress.enter="updatePassword">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style setup>
.profile-card {
	max-width: 220px;
}
.customer-picture {
	max-width: 200px;
}
</style>
