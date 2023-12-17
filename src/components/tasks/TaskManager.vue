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