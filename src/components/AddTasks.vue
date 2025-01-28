<template>
  <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-center mb-6">Adicionar Nova Tarefa</h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="space-y-2">
        <label for="title" class="block text-sm font-medium text-gray-700">Título *</label>
        <input
          v-model="task.title"
          type="text"
          id="title"
          class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o título da tarefa"
          required
        />
      </div>

      <div class="space-y-2">
        <label for="description" class="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          v-model="task.description"
          id="description"
          class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite a descrição da tarefa"
        ></textarea>
      </div>

      <div class="space-y-2">
        <label for="priority" class="block text-sm font-medium text-gray-700">Prioridade</label>
        <select
          v-model="task.priority"
          id="priority"
          class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Selecione a prioridade</option>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
      </div>

      <div class="space-y-2">
        <label for="completionDate" class="block text-sm font-medium text-gray-700"
          >Data de Conclusão</label
        >
        <input
          v-model="task.completionDate"
          type="date"
          id="completionDate"
          class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="space-y-2">
        <label for="category" class="block text-sm font-medium text-gray-700">Categoria</label>
        <select
          v-model="task.category"
          id="category"
          class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Selecione a categoria</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Estudo">Estudo</option>
        </select>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Adicionar
        </button>
      </div>
    </form>

    <div class="mt-10">
      <h3 class="text-lg font-semibold mb-4">Filtros</h3>

      <div class="space-y-2 mb-4">
        <label for="categoryFilter" class="block text-sm font-medium text-gray-700"
          >Filtrar por Categoria</label
        >
        <select
          v-model="categoryFilter"
          id="categoryFilter"
          class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Estudo">Estudo</option>
        </select>
      </div>

      <!-- Filtro por Prioridade -->
      <div class="space-y-2 mb-4">
        <label for="priorityFilter" class="block text-sm font-medium text-gray-700"
          >Filtrar por Prioridade</label
        >
        <select
          v-model="priorityFilter"
          id="priorityFilter"
          class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas</option>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-4">Tarefas Adicionadas</h3>
      <ul class="space-y-4">
        <li
          v-for="taskItem in filteredTasks"
          :key="taskItem.id"
          class="p-4 bg-gray-100 rounded-md shadow-sm"
        >
          <h4 class="font-semibold text-lg text-gray-800">{{ taskItem.title }}</h4>
          <p class="text-gray-600">{{ taskItem.description }}</p>
          <p>
            <strong>Prioridade:</strong> <span class="text-blue-600">{{ taskItem.priority }}</span>
          </p>
          <p><strong>Data de Conclusão:</strong> {{ taskItem.completionDate }}</p>
          <p><strong>Categoria:</strong> {{ taskItem.category }}</p>

          <div class="mt-2 flex space-x-4">
            <button
              @click="editTask(taskItem)"
              class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Editar
            </button>
            <button
              @click="deleteTask(taskItem.id)"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Excluir
            </button>
          </div>
        </li>
        <li v-if="filteredTasks.length === 0" class="text-center text-gray-500">
          Nenhuma tarefa cadastrada.
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useTaskStore } from '../stores/tasksStore'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { Task } from '../shared/types/ipc'
import { ref, computed } from 'vue'

export default defineComponent({
  name: 'AddTasks',
  setup() {
    const taskStore = useTaskStore()
    const categoryFilter = ref('')
    const priorityFilter = ref('')

    const task = reactive<Task>({
      id: '',
      title: '',
      description: '',
      priority: '',
      completionDate: '',
      category: '',
    })

    const filteredTasks = computed(() => {
      return taskStore.tasks.filter((task) => {
        const matchesCategory = categoryFilter.value ? task.category === categoryFilter.value : true
        const matchesPriority = priorityFilter.value ? task.priority === priorityFilter.value : true
        return matchesCategory && matchesPriority
      })
    })

    const handleSubmit = async () => {
      if (!task.title) {
        return
      }

      try {
        if (task.id) {
          await taskStore.editTask(task)
        } else {
          const taskWithId = {
            ...task,
            id: uuidv4(),
          }
          await taskStore.addTask(taskWithId)
        }

        task.title = ''
        task.description = ''
        task.priority = ''
        task.completionDate = ''
        task.category = ''
      } catch (error) {
        console.error('Erro ao adicionar tarefa:', error)
      }
    }

    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:5175/tasks')
      taskStore.tasks = response.data
    }

    const editTask = (taskItem: Task) => {
      task.title = taskItem.title
      task.description = taskItem.description
      task.priority = taskItem.priority
      task.completionDate = taskItem.completionDate
      task.id = taskItem.id
    }

    const deleteTask = async (taskId: string) => {
      try {
        await taskStore.deleteTask(taskId)
      } catch (error) {
        console.error('Erro ao excluir tarefa:', error)
      }
    }

    fetchTasks()

    return {
      task,
      handleSubmit,
      taskStore,
      editTask,
      deleteTask,
      filteredTasks,
      priorityFilter,
      categoryFilter,
    }
  },
})
</script>
