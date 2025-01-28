<template>
  <div class="mb-5">
    <label :for="name" class="uppercase text-sm text-gray-600 font-bold">{{ label }}</label>
    <input
      :id="name"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg border"
      :class="{ 'border-red-700': error }"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'InputUtility',
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      required: true,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      const input = event.target as HTMLInputElement
      if (input) {
        emit('update:modelValue', input.value)
      }
    }

    return {
      handleInput,
    }
  },
}
</script>
