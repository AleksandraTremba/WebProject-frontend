<script setup lang="ts">

import { ref } from 'vue';
import { Customer } from '@/models/Customer.ts';

let customer: Customer = new Customer();

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
	<div class="container d-flex flex-row justify-content-center">
		<div class="card border-0 rounded-4 p-3 shadow profile-card">
			<div class="d-flex flex-column">
				<div class="customer-picture mb-2">
					<img src="../../public/profile.jpg" class="img-fluid rounded-circle" />
				</div>
				<div class="customer-nickname">
					<p class="fs-3 fw-bold text-secondary">Nickname</p>
				</div>
				<div class="customer-biography">
					<p>Here is a little bit about the biography of this user</p>
				</div>
				<div class="customer-location">
					<p>Location</p>
				</div>
				<div class="">
					<button class="btn btn-primary">Favourite</button>
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
