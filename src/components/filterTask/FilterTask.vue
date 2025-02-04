<template>
  <div v-if="tasks.length">
    <ul>
      <li
        v-for="taskItem in tasks"
        :key="taskItem.id"
        class="p-4 border-b border-gray-200 flex justify-between items-center relative"
      >
        <div class="flex flex-col cursor-pointer w-full" @click="openModal(taskItem)">
          <span class="text-lg font-medium mb-2">{{ taskItem.title }}</span>

          <div class="flex space-x-4 text-sm text-gray-500">
            <span v-if="taskItem.priority" class="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
              {{ taskItem.priority }}
            </span>
            <span v-if="taskItem.category" class="bg-green-100 text-green-800 px-2 py-1 rounded-md">
              {{ taskItem.category }}
            </span>
          </div>
        </div>

        <div>
          <ButtonUtility
            @click.stop="deleteTask(taskItem.id)"
            name="🗑️"
            class="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all duration-200 ease-in-out"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Task } from '../../shared/types/ipc'
import ButtonUtility from '../utility/ButtonUtility.vue'

export default defineComponent({
  name: 'FilterTask',
  components: {
    ButtonUtility,
  },
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      required: true,
    },
    openModal: {
      type: Function,
      required: true,
    },
    deleteTask: {
      type: Function,
      required: true,
    },
  },
})
</script>
