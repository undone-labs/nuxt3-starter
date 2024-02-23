<template>
  <PageError
    :status-code="error.statusCode"
    :message="error.message"
    :stack="error.stack"
    :data="error.data" />
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
