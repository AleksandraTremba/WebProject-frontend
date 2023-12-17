<script lang="ts" setup>
    const emit = defineEmits(['changeTab']);
    defineProps({
        isSignedIn: Boolean,
    });


    function changeTab(id: number) {
        emit('changeTab', id);
    }
</script>

<template>
    <div class="container-sm">
        <div class="row">
            <nav class="col-md-2 ps-0 position-fixed start-0">
                <div class="sidebar min-vh-100">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <h1 class="fs-1">Okapi</h1>
                        </li>
                        <a class="nav-btn mb-2 active" @click="$emit('changeTab', 0)" href="#"><li>
                            <p class="my-0 py-2 px-3 fs-5"><i class="bi bi-house-fill pe-2"></i>Home</p>
                        </li></a>
                        <a v-if="isSignedIn" class="nav-btn mb-2" @click="$emit('changeTab', 1)" href="#"><li>
                            <p class="my-0 py-2 px-3 fs-5"><i class="bi bi-list-task pe-2"></i>My Tasks</p>
                        </li></a>
                        <a v-if="isSignedIn" class="nav-btn mb-2" @click="$emit('changeTab', 2)" href="#"><li>
                            <p class="my-0 py-2 px-3 fs-5"><i class="bi bi-people-fill pe-2"></i>Group</p>
                        </li></a>
                        <a class="nav-btn mb-2" @click="$emit('changeTab', 3)" href="#"><li>
                            <p class="my-0 py-2 px-3 fs-5"><i class="bi bi-bar-chart-fill pe-2"></i>Records</p>
                        </li></a>
                        <a v-if="!isSignedIn" class="nav-btn" @click="$emit('changeTab', 4)" href="#"><li>
                            <p class="my-0 py-2 px-3 fs-5"><i class="bi bi-box-arrow-in-left pe-2"></i>Login</p>
                        </li></a>
                        <a v-if="isSignedIn" class="nav-btn" @click="$emit('changeTab', 4)" href="#"><li>
                            <p class="my-0 py-2 px-3 fs-5"><i class="bi bi-person-badge pe-2"></i>Profile</p>
                        </li></a>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<style src="@/assets/colours.css"></style>
<style>
.sidebar {
    background-color: var(--slightly-dark-colour);
    padding: 20px;
    box-shadow: 0 0 5px var(--darkest-colour);
}

.nav-btn {
    color: var(--almost-black-colour);
    text-decoration: none;
}

.active {
    background-color: var(--more-dark-colour);
    border-radius: 8px;
}

.nav-btn:hover {
    background-color: var(--dark-colour);
    border-radius: 8px;
}
</style>
