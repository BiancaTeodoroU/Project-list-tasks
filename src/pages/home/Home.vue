<template>
  <main>
    <LoginForm
      :image="{
        src: '/src/assets/image/empresa-que.webp',
        alt: 'Logo da sessão de login',
      }"
      title="Tela de Login"
    />
  </main>
</template>

<script lang="ts">
import LoginForm from '../../components/LoginForm.vue'

export default {
  name: 'HomePage',
  components: {
    LoginForm,
  },
}
</script>
