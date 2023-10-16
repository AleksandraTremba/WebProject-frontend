<template>
    <div class="container" style="max-width: 600px">
      <!-- Heading -->
      <h2 class="text-center mt-5">Task Manager</h2>
  
      <!-- Input -->
      <div class="d-flex mt-5">
        <input
          type="text"
          v-model="task.title"
          placeholder="Enter task title"
          class="w-100 form-control"
        />
        <input
          type="text"
          v-model="task.description"
          placeholder="Enter task description"
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
            <th scope="col">Description</th>
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
              {{ task.description }}
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
              {{ task.status }}
              </span>
            </td>
            <td class="text-center">
              <button class="btn btn-warning rounded-0" @click="deleteTask(index)">
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
import axios from 'axios';

const url = "http://localhost:8080/api";
  export default {
    name: "HelloWorld",
    props: {
      msg: String,
    },
  
    data() {
      return {
        task: {
          id: 0,
          title: "",
          description: "",
        },
        editedTask: null,
        statuses: ["to-do", "in-progress", "finished"],
  
        /* Status could be: 'to-do' / 'in-progress' / 'finished' */
        tasks: [],
      };
    },

    created() {
      this.loadTasks();
    },
  
    methods: {
      
      async loadTasks() {
        try {
          const response = await axios.get(`${url}/tasks`);
          this.tasks = response.data;
        } catch (error) {
          console.error("Error fetching tasks:", error)
        }
      },
  
      /**
       * Change status of task by index
       */
      changeStatus(index) {
        const currentIndex = this.statuses.indexOf(this.tasks[index].status);
        const newIndex = (currentIndex + 1) % this.statuses.length;
        this.tasks[index].status = this.statuses[newIndex];
      },

      /**
       * Deletes task by index
       */
      async deleteTask(index) {
        if (this.tasks[index] && this.tasks[index].id) {
          const taskId = this.tasks[index].id;  
          try {
            await axios.delete(`${url}/tasks/${taskId}`)
            this.tasks.splice(index, 1);
          } catch (error) {
            console.error("Error deleting task:", error);
          } 
        } else {
          console.error("Invalid task or missing ID.");
        }
      },
  
      /**
       * Edit task
       */
      editTask(index) {
        this.task.title = this.tasks[index].title;
        this.task.description = this.tasks[index].description;
        this.editedTask = index;
      },
  
      /**
       * Add / Update task
       */
      async submitTask() {
        if (!this.task.title) return;

          const taskData = {
            title: this.task.title,
            description: this.task.description,
            status: "to-do", // You can set the status as needed
          };

          if (this.editedTask != null) {
          // We need to update the task
            try {
              await axios.put(`${url}/tasks/${this.tasks[this.editedTask].id}`, taskData)
              this.tasks[this.editedTask].title = this.task.title;
              this.tasks[this.editedTask].description = this.task.description;
              this.editedTask = null;
            } catch (error) {
              console.error("Error updating task:", error);
            }
          } else {
            // We need to add a new task
            try {
              const response = await axios.post(`${url}/tasks`, taskData)
              this.tasks.push(response.data);
            } catch (error) {
                console.error("Error adding task:", error);
            }
          }

          this.task.title = "";
          this.task.description = "";
        }
    },
  }
  </script>
  
  <style scoped>
  .pointer {
    cursor: pointer;
  }
  .line-through {
    text-decoration: line-through;
  }
  </style>