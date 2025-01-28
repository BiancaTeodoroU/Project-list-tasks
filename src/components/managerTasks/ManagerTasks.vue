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

    <!-- Exibindo Tarefas -->
    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-4">Tarefas Adicionadas</h3>
      <FilterTask :tasks="filteredTasks" :openModal="openModal" :deleteTask="deleteTask" />
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 class="text-2xl font-bold mb-4">Detalhes da Tarefa</h2>
        <form @submit.prevent="handleModalSubmit">
          <div class="space-y-2 mb-4">
            <label for="modalTitle" class="block text-sm font-medium text-gray-700">Título</label>
            <input
              v-model="modalTask.title"
              type="text"
              id="modalTitle"
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div class="space-y-2 mb-4">
            <label for="modalDescription" class="block text-sm font-medium text-gray-700"
              >Descrição</label
            >
            <textarea
              v-model="modalTask.description"
              id="modalDescription"
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div class="space-y-2 mb-4">
            <label for="modalPriority" class="block text-sm font-medium text-gray-700"
              >Prioridade</label
            >
            <select
              v-model="modalTask.priority"
              id="modalPriority"
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div class="space-y-2 mb-4">
            <label for="modalCompletionDate" class="block text-sm font-medium text-gray-700"
              >Data de Conclusão</label
            >
            <input
              v-model="modalTask.completionDate"
              type="date"
              id="modalCompletionDate"
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="space-y-2 mb-4">
            <label for="modalCategory" class="block text-sm font-medium text-gray-700"
              >Categoria</label
            >
            <select
              v-model="modalTask.category"
              id="modalCategory"
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pessoal">Pessoal</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Estudo">Estudo</option>
            </select>
          </div>

          <div class="flex justify-end">
            <ButtonUtility
              name="Salvar Alterações"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            />
            <ButtonUtility
              @click="closeModal"
              name="Fechar"
              class="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FilterTask from '../filterTask/FilterTask.vue'
import ButtonUtility from '../ButtonUtility.vue'
import { defineComponent, reactive, ref, computed } from 'vue'
import { useTaskStore } from '../../stores/tasksStore'
import { Task } from '../../shared/types/ipc'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export default defineComponent({
  name: 'ManagerTasks',
  components: {
    ButtonUtility,
    FilterTask,
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
})
</script>
