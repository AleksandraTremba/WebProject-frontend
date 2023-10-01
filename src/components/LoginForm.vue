<script setup>

import { ref } from 'vue';

const url = "http://localhost:8080/api/users/login";
const user = {
    username: '',
    password: ''
};

let notLogged = ref(null);

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
        .then(data => notLogged.value = data)
}
</script>

<template>
    <div class="login-form">
        <input type="text" class="form-control mb-2" placeholder="Nickname" v-model="user.username"/>
        <input type="password" class="form-control mb-2" placeholder="Password" v-model="user.password"/>
        <button type="button" class="btn btn-primary w-100" :class="{'btn-danger': notLogged == false}" @click="confirmLogin">Login</button>
        <div class="text-center">
            <p v-if="notLogged == false" class="invalid ">Invalid credentials!</p>
        </div>
    </div>
</template>

<style setup>
.invalid {
    color: var(--bs-danger-text-emphasis);
}
</style>