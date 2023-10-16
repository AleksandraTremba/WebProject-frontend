<script setup>

import { ref } from 'vue';

const url = "http://localhost:8080/api/users/register";
const user = {
    username: '',
    password: ''
};

let isTaken = ref(null);

function confirmLogin() {
    const userBody = JSON.stringify(user);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: userBody,
    })
        .then(response => response.json())
        .then((data) => isTaken.value = data)
}
</script>

<template>
    <div class="registration-form">
        <input type="text" class="form-control mb-2" placeholder="Nickname" v-model="user.username"/>
        <input type="password" class="form-control mb-2" placeholder="Password" v-model="user.password"/>
        <button type="button" class="btn btn-primary w-100" :class="{'btn-warning': isTaken}" @click="confirmLogin">Register</button>
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