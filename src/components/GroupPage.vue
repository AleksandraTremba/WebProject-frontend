<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
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
          </ul>
        </div>
      </nav>

     <main role="main" class="col-md-2">
     <div class="d-flex align-items-center">
      <!-- Users Container -->
      <div class="col-md-3 user-container align-self-start">
        <h2 class="users-name">Users</h2>
        <div class="user-list">
          <ul class="nav flex-column">
            <li class="users-nav-item text-center">
              <p class="one-task"> First user </p>
            </li>
            <li class="users-nav-item">
              <p class="one-task"> Second user </p>
            </li>
            <li class="users-nav-item">
              <p class="one-task"> Third user </p>
            </li>
            <li class="users-nav-item">
              <p class="one-task"> Fourth user </p>
            </li>
            <li class="users-nav-item">
              <p class="one-task"> Fifth user </p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tasks Container -->
      <div class="col-md-7 group-task-page-container align-self-start" style="max-width: 600px">
        <!-- Heading -->
        <h2 class="text-center mt-5">Task Manager</h2>

        <!-- Input -->
        <div class="d-flex mt-5">
          <input
            type="text"
            v-model="task"
            placeholder="Enter task"
            class="w-100 form-control"
          />
          <button class="btn btn-warning rounded-0" @click="submitTask">
            Add
          </button>
        </div>

        <!-- Task table -->
        <table class="table table-bordered mt-5">
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col" style="width: 120px">Status</th>
              <th scope="col" class="text-center">#</th>
              <th scope="col" class="text-center">#</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in tasks" :key="index">
              <td>
                <span :class="{ 'line-through': task.status === 'finished' }">
                  {{ task.name }}
                </span>
              </td>
              <td>
                <span
                  class="pointer noselect"
                  @click="changeStatus(index)"
                  :class="{
                    'text-danger': task.status === 'to-do',
                    'text-success': task.status === 'finished',
                    'text-warning': task.status === 'in-progress',
                  }"
                >
                  {{ capitalizeFirstChar(task.status) }}
                </span>
              </td>
              <td class="text-center">
                <button class="btn btn-warning rounded-0" @click="deleteTask">
                  Delete
                </button>
              </td>
              <td class="text-center">
                <button
                  class="btn btn-warning rounded-0"
                  @click="editTask(index)"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
      </main>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "HelloWorld",
    props: {
      msg: String,
    },
  
    data() {
      return {
        task: "",
        editedTask: null,
        statuses: ["to-do", "in-progress", "finished"],
  
        /* Status could be: 'to-do' / 'in-progress' / 'finished' */
        tasks: [],
      };
    },
  
    methods: {
      /**
       * Capitalize first character
       */
      capitalizeFirstChar(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
  
      /**
       * Change status of task by index
       */
      changeStatus(index) {
        let newIndex = this.statuses.indexOf(this.tasks[index].status);
        if (++newIndex > 2) newIndex = 0;
        this.tasks[index].status = this.statuses[newIndex];
      },
  
      /**
       * Deletes task by index
       */
      deleteTask(index) {
        this.tasks.splice(index, 1);
      },
  
      /**
       * Edit task
       */
      editTask(index) {
        this.task = this.tasks[index].name;
        this.editedTask = index;
      },
  
      /**
       * Add / Update task
       */
      submitTask() {
        if (this.task.length === 0) return;
  
        /* We need to update the task */
        if (this.editedTask != null) {
          this.tasks[this.editedTask].name = this.task;
          this.editedTask = null;
        } else {
          /* We need to add new task */
          this.tasks.push({
            name: this.task,
            status: "todo",
          });
        }
  
        this.task = "";
      },
    },
  };
  </script>
  
  <style scoped>
  .pointer {
    cursor: pointer;
  }
  .line-through {
    text-decoration: line-through;
  }

  .user-container {
   background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  height: 750px;
  min-width: 300px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 50px;
}

.users-nav-item {
  margin-bottom: 10px;
  margin-right: auto;
  color: white;
}

.users-name {
  color: white;
  font-size: 1.5rem; 
  margin-bottom: 100px;
  margin-left: 70px;
}

.group-task-page-container {
    width: 1000px;
}
  </style>