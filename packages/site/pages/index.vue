<template>
  <div class="asd">
    {{ zeroUuid().v4() }}
    <ZeroMarkdownParser markdown="### hello" />
    <ZeroButton>
      Helloooo
    </ZeroButton>
  </div>
</template>

<script setup>
// const { $bus } = useNuxtApp()
// console.log($bus)
</script>
