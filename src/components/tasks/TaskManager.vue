<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { HttpClient } from '@/api/HttpClient';
import { TaskHandler, Task } from '@/models/Tasks';

const props = defineProps({
	http: HttpClient,
	customerId: Number,
})

let taskShell: Task = new Task(0, props.customerId);
let taskHandler: TaskHandler = reactive(new TaskHandler(props.http));

let mouseOver: boolean = false;

loadData();

function loadData() {
	let promise = taskHandler.load(props.customerId);
	promise.then((result) => {
		console.log(result);
		result.forEach((el) => {
			taskHandler.tasks.set(el.id, el);
		});
		console.log(taskHandler.tasks);
	}, (err) => {
		console.log(err);
	})
}

function createTask() {
	let promise = taskHandler.create(taskShell);
	promise.then((result) => {
		console.log(result);
		taskHandler.addTask(taskShell);
	}, (err) => {
		console.log(err);
	})
}

function editTask(id: BigInt) {
	let task: Task | undefined = taskHandler.tasks.get(id);

	if (task !== undefined) {
		task.customerId = props.customerId;
		let promise = taskHandler.edit(task);
		promise.then((result) => {
			console.log(result);
			taskHandler.editTask(task);
		}, (err) => {
			console.log(err);
		})
	}
}

function deleteTask(id: BigInt) {
	let task: Task | undefined = taskHandler.tasks.get(id);

	if (task !== undefined) {
		task.customerId = props.customerId;
		let promise = taskHandler.delete(task);
		promise.then((result) => {
			console.log(result);
			taskHandler.deleteTask(id);
		}, (err) => {
			console.log(err);
		})
	}
}

</script>

<template>
<div class="container d-flex flex-row justify-content-center">
    <div class="d-flex flex-column">
        <h2 class="text-center mt-5">Tasks</h2>
        <div class="container d-flex flex-row">
        </div>
        <div class="card border-0 rounded-4 p-3 shadow-sm task-card" style="max-width: 512px">
        	<div class="mb-3">
	        	<div class="d-flex flex-row align-items-center">
			        <div class="form-floating me-2">
				        <input type="text" class="form-control group-input" id="floatingInputGroup1" placeholder="Name your task!" v-model="taskShell.title" @keypress.enter="createTask">
				        <label for="floatingInputGroup1">Name your task!</label>
				    </div>
				    <div class="form-floating">
				       	<input type="text" class="form-control group-input" id="floatingInputGroup1" placeholder="Give it a description" v-model="taskShell.description">
				        <label for="floatingInputGroup1">Give it a description</label>
				    </div>
				    <div class="submit-btn ms-2">
				       	<button type="button" class="btn btn-primary" @click="createTask"><i class="bi bi-plus fs-4"></i></button>
				    </div>
			    </div>
			</div>
			<div class="d-flex justify-content-center">
				<div class="d-flex flex-column">
			        <div class="card border-0 rounded-4 p-3 bg-shadow task-card mb-3" style="max-width: 356px" v-for="[id, task] in taskHandler.tasks" @mouseover="mouseOver = true" @mouseleave="mouseOver = false">
			            <div class="task-items row">
			                <div class="col">
			                    <h3 class="task-name fs-4"> {{ task.title }} </h3>
			                    <p class="task-description"> {{ task.description }} </p>
			                </div>
			                <div class="col">
			                    <div class="container d-flex flex-column align-items-center">
			                        <div class="card border-0 rounded-5 p-2 task-status-card">
			                            <p class="task-status"> {{ task.status }} </p>
			                        </div>
			                        <div class="button-container mt-2 d-flex">
			                            <button type="button" class="btn btn-primary" style="margin-right: 10px;" @click="editTask(id)">
			                                <i class="bi bi-pencil"></i>
			                            </button>
			                            <button type="button" class="btn btn-primary" @click="deleteTask(id)">
			                                <i class="bi bi-trash"></i>
			                            </button>
			                        </div>
			                    </div>
			                </div>
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

.bg-shadow {
	box-shadow: var(--bs-box-shadow-sm) !important;
	transition: box-shadow 1s;
}

.bg-shadow:hover {
	box-shadow: var(--bs-box-shadow) !important;
}
</style>
<style>
/*=======
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
				<button class="btn btn-warning rounded-0" @click="createTask">
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
							<button class="btn btn-warning rounded-0" @click="deleteTask(id)">
								Delete
							</button>
						</td>
						<td class="text-center">
							<button class="btn btn-warning rounded-0" @click="editTask(id)">
								Edit
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</template>
>>>>>>> main*/

</style>