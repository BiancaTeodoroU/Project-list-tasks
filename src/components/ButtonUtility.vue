<template>
  <button
    type="submit"
    class="uppercase cursor-pointer text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
  >
    {{ name }}
  </button>
</template>

<script lang="ts">
export default {
  name: 'ButtonUtility',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
