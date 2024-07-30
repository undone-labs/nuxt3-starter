<template>
  <ErrorGeneral :error="error" />
</template>

<script setup>
// ======================================================================== Data
defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>
