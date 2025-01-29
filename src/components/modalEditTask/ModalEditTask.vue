<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h2 class="text-2xl font-bold mb-4">Detalhes da Tarefa</h2>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-2 mb-4">
          <label for="modalTitle" class="block text-sm font-medium text-gray-700">Título</label>
          <input
            v-model="modalTask.title"
            type="text"
            id="modalTitle"
            @blur="validateTitle"
            class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': titleError }"
            required
          />
          <p v-if="titleError" class="text-red-700 text-sm mb-1">Campo obrigatório</p>
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
</template>

<script lang="ts">
import ButtonUtility from '../utility/ButtonUtility.vue'
import { defineComponent, PropType, ref } from 'vue'
import { Task } from '../../shared/types/ipc'

export default defineComponent({
  name: 'ModalEditTask',
  components: { ButtonUtility },
  props: {
    modalEditTask: {
      type: Object as PropType<Task>,
      required: true,
    },
    handleModalSubmit: {
      type: Function as PropType<() => void>,
      required: true,
    },
    closeModal: {
      type: Function as PropType<() => void>,
      required: true,
    },
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const titleError = ref(false)
    const modalTask = props.modalEditTask

    const validateTitle = (): boolean => {
      if (!modalTask.title) {
        titleError.value = true
      } else {
        titleError.value = false
      }
      return titleError.value
    }

    const handleSubmit = async () => {
      await props.handleModalSubmit()
    }

    return {
      titleError,
      validateTitle,
      modalTask,
      handleSubmit,
    }
  },
})
</script>
