<template>
  <div
    class="max-w-screen-xl md:mt-24 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto text-gray-900 rounded-lg shadow-lg"
  >
    <div class="flex flex-col justify-between">
      <h1 class="text-2xl lg:text-2xl font-bold text-center">Gerenciamento de tarefas</h1>
      <img class="w-full" :src="image.src" :alt="image.alt" />
    </div>
    <form @submit.prevent="handleLogin">
      <div class="mb-5">
        <InputUtility
          label="Nome"
          type="name"
          name="name"
          v-model="name"
          :error="nameError"
          :errorMessage="nameErrorMessage"
          placeholder="Digite seu nome"
          :class="{ 'border-red-700': nameError }"
        />
        <p v-if="nameError" class="text-red-700 text-sm mb-1">
          {{ nameErrorMessage }}
        </p>
      </div>
      <div class="mb-5">
        <InputUtility
          label="Senha"
          type="password"
          name="password"
          v-model="password"
          :error="passwordError"
          :errorMessage="passwordErrorMessage"
          placeholder="Digite sua senha"
          :class="{ 'border-red-700': passwordError }"
        />
        <p v-if="passwordError" class="text-red-700 text-sm mb-1">
          {{ passwordErrorMessage }}
        </p>
      </div>
      <ButtonUtility
        class="uppercase cursor-pointer text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
        name="Logar"
      />
      <p v-if="error" class="text-red-700 text-sm mt-3">Usuário não cadastrado.</p>
    </form>
  </div>
</template>

<script lang="ts">
import ButtonUtility from './ButtonUtility.vue'
import InputUtility from './InputUtility.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  components: {
    ButtonUtility,
    InputUtility,
  },
  setup() {
    const name = ref('')
    const password = ref('')
    const nameError = ref(false)
    const passwordError = ref(false)
    const nameErrorMessage = ref('')
    const passwordErrorMessage = ref('')
    const error = ref(false)
    const success = ref(false)
    const router = useRouter()

    const validateForm = (): boolean => {
      let isValid = true

      if (!name.value) {
        nameError.value = true
        nameErrorMessage.value = 'O campo Nome é obrigatório.'
        isValid = false
      } else {
        nameError.value = false
        nameErrorMessage.value = ''
      }

      if (!password.value.trim() || password.value.length < 8) {
        passwordError.value = true
        passwordErrorMessage.value = password.value
          ? 'Senha deve ter no mínimo 8 caracteres'
          : 'Campo Obrigatório'
        isValid = false
      } else {
        passwordError.value = false
        passwordErrorMessage.value = ''
      }

      return isValid
    }

    const handleLogin = async () => {
      if (!validateForm()) return

      try {
        const response = await axios.get('http://localhost:5174/user')
        const user = response.data.find(
          (e: { name: string; password: string }) =>
            e.name === name.value && e.password === password.value,
        )

        if (user) {
          success.value = true
          error.value = false
          router.push('/painel')
        } else {
          throw new Error('Usuário ou senha inválidos.')
        }
      } catch (err) {
        error.value = true
        success.value = false
        console.error('Erro durante o login:', err)
      }
    }

    return {
      name,
      password,
      error,
      success,
      nameError,
      passwordError,
      nameErrorMessage,
      passwordErrorMessage,
      handleLogin,
    }
  },
}
</script>
