import { defineStore } from 'pinia'
import { Task } from '../shared/types/ipc'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    async addTask(task: Task) {
      try {
        const uuid = uuidv4()
        const response = await axios.post('http://localhost:5175/tasks', {
          ...task,
          id: uuid,
          category: task.category || 'Pessoal',
        })
        this.tasks.push(response.data)
        return response.data
      } catch (error) {
        console.error('Erro ao adicionar a tarefa:', error)
        throw error
      }
    },

    async editTask(updatedTask: Task) {
      try {
        const response = await axios.put(
          `http://localhost:5175/tasks/${updatedTask.id}`,
          updatedTask,
        )
        const index = this.tasks.findIndex((task) => task.id === updatedTask.id)
        if (index !== -1) {
          this.tasks[index] = response.data
        }
        return response.data
      } catch (error) {
        console.error('Erro ao editar a tarefa:', error)
        throw error
      }
    },

    async deleteTask(taskId: string) {
      try {
        await axios.delete(`http://localhost:5175/tasks/${taskId}`)
        this.tasks = this.tasks.filter((task) => task.id !== taskId)
      } catch (error) {
        console.error('Erro ao excluir a tarefa:', error)
        throw error
      }
    },

    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:5175/tasks')
        this.tasks = response.data
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error)
        throw error
      }
    },
  },
})
