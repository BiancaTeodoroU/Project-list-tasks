<template>
  <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-4">
    <div class="u-flex u-items-center">
      <h2 class="text-2xl font-bold text-center mb-6">Adicionar Nova Tarefa</h2>
      <AddTask />
      <div class="mt-10">
        <h3 class="text-lg font-semibold mb-4">Filtros</h3>

        <div class="space-y-2 mb-4">
          <label for="categoryFilter" class="block text-sm font-medium text-gray-700">
            Filtrar por Categoria
          </label>
          <div id="categoryFilter">
            <ButtonUtility
              @click="() => changedFilterCategory('Todas')"
              name="Todas"
              class="px-4 cursor-pointer py-2 mr-3 mb-3 sm:mb-0 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            />
            <ButtonUtility
              @click="() => changedFilterCategory('Pessoal')"
              name="Pessoal"
              class="px-4 cursor-pointer py-2 mr-3 mb-3 sm:mb-0 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            />
            <ButtonUtility
              @click="() => changedFilterCategory('Trabalho')"
              name="Trabalho"
              class="px-4 cursor-pointer py-2 mr-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            />
            <ButtonUtility
              @click="() => changedFilterCategory('Estudo')"
              name="Estudo"
              class="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            />
          </div>
        </div>

        <div class="space-y-2 mb-4">
          <label for="priorityFilter" class="block text-sm font-medium text-gray-700">
            Filtrar por Prioridade
          </label>
          <div id="priorityFilter">
            <ButtonUtility
              @click="() => changedFilterpriority('Todas')"
              name="Todas"
              class="px-4 cursor-pointer py-2 mr-3 mb-3 sm:mb-0 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            />
            <ButtonUtility
              @click="() => changedFilterpriority('Baixa')"
              name="Baixa"
              class="px-4 cursor-pointer py-2 mr-3 mb-3 sm:mb-0 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            />
            <ButtonUtility
              @click="() => changedFilterpriority('Média')"
              name="Média"
              class="px-4 cursor-pointer py-2 mr-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            />
            <ButtonUtility
              @click="() => changedFilterpriority('Alta')"
              name="Alta"
              class="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-4">Tarefas Adicionadas</h3>
      <FilterTask :tasks="filteredTasks" :openModal="openModal" :deleteTask="deleteTask" />
    </div>
    <ModalEditTask
      v-if="isModalOpen"
      :modalEditTask="modalTask"
      :handleModalSubmit="handleModalSubmit"
      :closeModal="closeModal"
      :isModalOpen="isModalOpen"
    />
  </div>
</template>

<script lang="ts">
import ButtonUtility from '../../utility/ButtonUtility.vue'
import ModalEditTask from '../../modalEditTask/ModalEditTask.vue'
import AddTask from '../../addtasks/AddTasks.vue'
import FilterTask from '../../filterTask/FilterTask.vue'
import { defineComponent, reactive, ref, computed } from 'vue'
import { useTaskStore } from '../../../stores/tasksStore'
import { Task } from '../../../shared/types/ipc'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export default defineComponent({
  name: 'ManagerTasks',
  components: {
    FilterTask,
    ButtonUtility,
    AddTask,
    ModalEditTask,
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
        const matchesCategory =
          categoryFilter.value === '' || task.category === categoryFilter.value
        const matchesPriority =
          priorityFilter.value === '' || task.priority === priorityFilter.value
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

    const handleModalSubmit: () => void = async () => {
      try {
        await taskStore.editTask(modalTask)
        closeModal()
      } catch (error) {
        console.error('Erro ao salvar alterações:', error)
      }
    }

    const changedFilterCategory = (name: string) => {
      if (name === 'Todas') {
        categoryFilter.value = ''
      } else {
        categoryFilter.value = name
      }
    }

    const changedFilterpriority = (name: string) => {
      if (name === 'Todas') {
        priorityFilter.value = ''
      } else {
        priorityFilter.value = name
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
      changedFilterpriority,
      changedFilterCategory,
      modalTask,
    }
  },
})
</script>
