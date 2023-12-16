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
		<div class="container" style="max-width: 600px">
			<!-- Heading -->
			<h2 class="text-center mt-5">Task Manager</h2>
	
			<!-- Input -->
			<div class="d-flex mt-5">
				<input
					type="text"
					v-model="taskShell.title"
					placeholder="Enter task title"
					class="w-100 form-control"
				/>
				<input
					type="text"
					v-model="taskShell.description"
					placeholder="Enter task description"
					class="w-100 form-control"
				/>
				<button class="btn btn-warning rounded-0" @click="taskHandler.create(taskShell)">
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
					<tr v-for="[id, task] in taskHandler.tasks" :key="id">
						<td class="text-center">
								{{ task.title }}
						</td>
						<td>
							{{ task.description }}
						</td>
						<td>
							<span class="pointer noselect">
								{{ task.status }}
							</span>
						</td>
						<td class="text-center">
							<button class="btn btn-warning rounded-0" @click="taskHandler.delete(id)">
								Delete
							</button>
						</td>
						<td class="text-center">
							<button class="btn btn-warning rounded-0" @click="taskHandler.edit(id)">
								Edit
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</template>

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