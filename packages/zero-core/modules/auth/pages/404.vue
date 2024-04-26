<template>
  <Error404 />
</template>

<script setup>
// ======================================================================== Data
definePageMeta({
  layout: 'zero-auth-layout',
  authenticate: false
})

useHead({ title: '404 Not Found' })
</script>
