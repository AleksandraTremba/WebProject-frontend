<template>
 <div class="col-md-3 user-container align-self-start">
        <h2 class="users-name">Users</h2>
        <div class="user-list text-center">
          <ul class="nav flex-column">
            <li class="users-nav-item text-center">
              <p class="one-user"> First user </p>
            </li>
            <li class="users-nav-item">
              <p class="one-user"> Second user </p>
            </li>
            <li class="users-nav-item">
              <p class="one-user"> Third user </p>
            </li>
            <li class="users-nav-item">
              <p class="one-user"> Fourth user </p>
            </li>
            <li class="users-nav-item">
              <p class="one-user"> Fifth user </p>
            </li>
          </ul>
        </div>
      </div>
</template>

<script>

</script>

<style>
.user-container {
   background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  height: 700px;
   max-width: 300px;
  min-width: 300px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 50px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.3); 
}

.one-user {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 20px;
  width: 200px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.3); 
}

.users-nav-item {
  margin-bottom: 10px;
  margin-right: auto;
  color: white;
  display: flex;
}

.users-name {
  color: white;
  font-size: 1.5rem; 
  margin-bottom: 100px;
  margin-left: 70px;
}
</style>
