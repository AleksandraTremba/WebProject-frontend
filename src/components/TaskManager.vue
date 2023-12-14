<template>
    <div class="col-md-7 task-page-container align-self-start" style="max-width: 600px">
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
              <button class="btn btn-warning rounded-0" @click="editTask(index)">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
  .task-page-container {
    width: 1000px;
  }

  </style>