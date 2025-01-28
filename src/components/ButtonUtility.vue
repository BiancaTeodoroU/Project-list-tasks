<template>
  <button type="submit">
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
