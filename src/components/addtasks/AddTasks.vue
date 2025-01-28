// <template>
//   <form @submit.prevent="handleSubmit" class="space-y-6">
//     <div class="space-y-2">
//       <label for="title" class="block text-sm font-medium text-gray-700">Título *</label>
//       <input
//         v-model="task.title"
//         type="text"
//         id="title"
//         class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Digite o título da tarefa"
//         @blur="validateTitle"
//         :class="{ 'border-red-500': titleError }"
//         required
//       />
//       <p v-if="titleError" class="text-red-700 text-sm mb-1">Campo obrigatório</p>
//     </div>

//     <div class="space-y-2">
//       <label for="description" class="block text-sm font-medium text-gray-700">Descrição</label>
//       <textarea
//         v-model="task.description"
//         id="description"
//         class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Digite a descrição da tarefa"
//       ></textarea>
//     </div>

//     <div class="space-y-2">
//       <label for="priority" class="block text-sm font-medium text-gray-700">Prioridade</label>
//       <select
//         v-model="task.priority"
//         id="priority"
//         class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="" disabled>Selecione a prioridade</option>
//         <option value="Baixa">Baixa</option>
//         <option value="Média">Média</option>
//         <option value="Alta">Alta</option>
//       </select>
//     </div>

//     <div class="space-y-2">
//       <label for="completionDate" class="block text-sm font-medium text-gray-700"
//         >Data de Conclusão</label
//       >
//       <input
//         v-model="task.completionDate"
//         type="date"
//         id="completionDate"
//         class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>

//     <div class="space-y-2">
//       <label for="category" class="block text-sm font-medium text-gray-700">Categoria</label>
//       <select
//         v-model="task.category"
//         id="category"
//         class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="" disabled>Selecione a categoria</option>
//         <option value="Pessoal">Pessoal</option>
//         <option value="Trabalho">Trabalho</option>
//         <option value="Estudo">Estudo</option>
//       </select>
//     </div>

//     <div class="flex justify-end">
//       <ButtonUtility
//         name="Adicionar Tarefa"
//         class="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700"
//       />
//     </div>
//   </form>
// </template>

// <script lang="ts">
// import { defineComponent, PropType } from 'vue'
// import { Task } from '../../shared/types/ipc'
// import ButtonUtility from '../ButtonUtility.vue'

// export default defineComponent({
//   name: 'AddTasks',
//   components: {
//     ButtonUtility,
//   },
//   props: {
//     task: {
//       type: Object as PropType<Task>,
//       required: true,
//     },
//     titleError: {
//       type: Boolean,
//       required: true,
//     },
//     handleSubmit: {
//       type: Function,
//       required: true,
//     },
//     validateTitle: {
//       type: Function,
//       required: true,
//     },
//   },
// })
// </script>
