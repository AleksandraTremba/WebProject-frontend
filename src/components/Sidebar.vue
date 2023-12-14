<template>

  <div>
    <div class="container-fluid">
        <div class="row">
            <nav class="col-md-2 d-none d-md-block sidebar">
                <div class="sidebar-sticky">
                    <ul class="nav flex-column">
                        <li class="nav-item text-center">
                            <h1 class="okapi_menu"> Okapi </h1>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Tasks</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Group</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Records</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
  </div>

</template>

<script>

</script>

<style>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 20px;
  background-color: #FAF8F8;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.nav-item {
  margin-bottom: 10px;
}

.nav-link {
  color: black;
}

.nav-link.active {
  background-color: #04AA6D;
  color: white;
}

.nav-link:hover:not(.active) {
  background-color: #C7C1BF;
  color: white;
}
</style>
