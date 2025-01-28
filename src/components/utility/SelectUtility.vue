<template>
  <select
    :v-model="modelValue"
    :id="name"
    :class="[
      'w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
      customClass,
    ]"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SelectUtility',
  props: {
    name: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      required: false,
    },
    options: {
      type: Array as PropType<Array<{ value: string; label: string }>>,
      required: true,
    },
    customClass: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:modelValue'],
})
</script>
