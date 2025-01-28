<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-2">
      <label for="title" class="block text-sm font-medium text-gray-700">Título *</label>
      <input
        v-model="task.title"
        type="text"
        id="title"
        class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite o título da tarefa"
        @blur="validateTitle"
        :class="{ 'border-red-500': titleError }"
        required
      />
      <p v-if="titleError" class="text-red-700 text-sm mb-1">Campo obrigatório</p>
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
      <ButtonUtility
        name="Adicionar Tarefa"
        class="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { reactive, ref, computed } from 'vue'
import { useTaskStore } from '../../stores/tasksStore'
import { Task } from '../../shared/types/ipc'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import ButtonUtility from '../utility/ButtonUtility.vue'

export default {
  name: 'AddTasks',
  components: {
    ButtonUtility,
  },
  setup() {
    const taskStore = useTaskStore()
    const categoryFilter = ref('')
    const priorityFilter = ref('')

    const isModalOpen = ref(false)
    const modalTask = reactive<Task>({
      id: '',
      title: '',
      description: '',
      priority: '',
      completionDate: '',
      category: '',
    })
    const titleError = ref(false)
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

    const validateTitle = (): boolean => {
      if (!task.title) {
        titleError.value = true
      } else {
        titleError.value = false
      }
      return titleError.value
    }

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

    const deleteTask = async (taskId: string) => {
      try {
        await taskStore.deleteTask(taskId)
      } catch (error) {
        console.error('Erro ao excluir tarefa:', error)
      }
    }

    const openModal = (taskItem: Task) => {
      modalTask.id = taskItem.id
      modalTask.title = taskItem.title
      modalTask.description = taskItem.description
      modalTask.priority = taskItem.priority
      modalTask.completionDate = taskItem.completionDate
      modalTask.category = taskItem.category
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
    }

    const handleModalSubmit = async () => {
      try {
        await taskStore.editTask(modalTask)
        closeModal()
      } catch (error) {
        console.error('Erro ao salvar alterações:', error)
      }
    }

    fetchTasks()

    return {
      task,
      handleSubmit,
      taskStore,
      deleteTask,
      filteredTasks,
      priorityFilter,
      categoryFilter,
      openModal,
      closeModal,
      handleModalSubmit,
      isModalOpen,
      modalTask,
      validateTitle,
      titleError,
    }
  },
}
</script>
