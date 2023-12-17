<script lang="ts" setup>

import { ref } from 'vue';
import { TaskHandler, Task } from '@/models/Tasks';

let taskShell: Task = new Task();
let taskHandler: TaskHandler = new TaskHandler();

	// export default {
	//   name: "HelloWorld",
	//   data() {
	//     return {
	//       task: {
	//         title: "",
	//         description: "",
	//         status: "TODO",
	//      customerId: 1,  
	//       },
	//       editedTask: null,
	//       tasks: [],
	//     };
	//   },

	//   created() {
	//     this.loadTasks();
	//   },
	
	//   methods: {
			
	//     async loadTasks() {
	//       try {
	//         const response = await axios.get(`${url}/tasks`);
	//         this.tasks = response.data;
	//       } catch (error) {
	//         console.error("Error fetching tasks:", error)
	//       }
	//     },
	
	//     /**
	//      * Change status of task by index
	//      */
	//     async changeStatus(index) {
	//       const currentStatus = this.tasks[index].status;
	//       const statusTransitions = {
	//         'To-do': 'In-progress',
	//         'In-progress': 'Finished',
	//         'Finished': 'To-do',
	//       };
	//       const newStatus = statusTransitions[currentStatus];
			
	//       const taskId = this.tasks[index].id;
	//       const taskData = { status: newStatus };
			
	//       try {
	//         await axios.put(`${url}/tasks/${taskId}/status`, taskData);
	//         this.tasks[index].status = newStatus;
	//       } catch (error) {
	//         console.error("Error updating task status:", error);
	//       }
	//     },


	//     /**
	//      * Deletes task by index
	//      */
	//     async deleteTask(index) {
	//       if (this.tasks[index] && this.tasks[index].id) {
	//         const taskId = this.tasks[index].id;  
	//         try {
	//           await axios.delete(`${url}/tasks/${taskId}`)
	//           this.tasks.splice(index, 1);
	//         } catch (error) {
	//           console.error("Error deleting task:", error);
	//         } 
	//       } else {
	//         console.error("Invalid task or missing ID.");
	//       }
	//     },
	
	//     /**
	//      * Edit task
	//      */
	//     editTask(index) {
	//       this.task.title = this.tasks[index].title;
	//       this.task.description = this.tasks[index].description;
	//       this.task.status = this.tasks[index].status
	//       this.editedTask = index;
	//     },
	
	//     /**
	//      * Add / Update task
	//      */
	//     async submitTask() {
	//       if (!this.task.title) return;

	//         const taskData = {
	//    customerId: 1,
	//           title: this.task.title,
	//           description: this.task.description,
	//           status: this.task.status // You can set the status as needed
	//         };

	//         if (this.editedTask != null) {
	//         // We need to update the task
	//           try {
	//             await axios.get(`${url}/tasks/${this.tasks[this.editedTask].id}`, taskData)
	//             this.tasks[this.editedTask].title = this.task.title;
	//             this.tasks[this.editedTask].description = this.task.description;
	//             this.tasks[this.editedTask].status = this.task.status;
	//             this.editedTask = null;
	//           } catch (error) {
	//             console.error("Error updating task:", error);
	//           }
	//         } else {
	//           // We need to add a new task
	//           try {
	//             const response = await axios.put(`${url}/tasks/create`, taskData)
	//             this.tasks.push(response.data);
	//             this.task.id = response.data.id;
	//           } catch (error) {
	//               console.error("Error adding task:", error);
	//           }
	//         }

	//         this.task.title = "";
	//         this.task.description = "";
	//         this.task.status = "TODO";
	//       }
	//   },
	// }
</script>

<template>
<div class="container d-flex flex-row justify-content-center">
    <div class="d-flex flex-column">
        <h2 class="text-center mt-5">Tasks</h2>
        <div class="card border-0 rounded-4 p-3 shadow task-card" style="max-width: 400px">
            <div class="task-items row">
                <div class="col">
                    <h3 class="task-name fs-4"> Task name </h3>
                    <p class="task-description"> Task description </p>
                </div>
                <div class="col">
                    <div class="container d-flex flex-column align-items-center">
                        <div class="card border-0 rounded-5 p-2 task-status-card">
                            <p class="task-status"> To Do </p>
                        </div>
                        <div class="button-container mt-2 d-flex">
                            <button type="button" class="btn btn-primary" style="margin-right: 10px;">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button type="button" class="btn btn-primary">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style src="@/assets/colours.css"></style>
<style setup>
.task-card {
	 background-color: var(--coffee-colour) !important;
}
.task-status-card {
    background-color: white !important;
    border-radius: 8px;
}
.bi {
	color: black;
}
</style>
<style>

</style>