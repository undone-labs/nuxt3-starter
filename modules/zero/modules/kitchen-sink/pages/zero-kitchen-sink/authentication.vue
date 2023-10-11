<template>
  <main class="page">

    <h1 class="page-heading">
      Authentication
    </h1>

    <ZeroKitchenSinkButton
      v-bind="button"
      @clicked="useLoginWith('github')">
      Login with GitHub
    </ZeroKitchenSinkButton>

    <h4>Session</h4>
    <ZeroMarkdownParser :markdown="sessionCode" />

    <h4>Account</h4>
    <ZeroMarkdownParser :markdown="accountCode" />

  </main>
</template>

<script setup>
// ===================================================================== Imports
import { storeToRefs } from 'pinia'

// ======================================================================= Setup
definePageMeta({
  layout: 'zero-layout'
})

// ======================================================================== Data
const authStore = useZeroAuthStore()
const { session, account } = storeToRefs(authStore)

const button = {
  tag: 'button',
  loader: 'zero-authentication-login',
  theme: 'basic'
}

// ==================================================================== Computed
const sessionCode = computed(() => '```json\n' + (session.value ? JSON.stringify(session.value, null, 2) : 'No session found') + '\n```')
const accountCode = computed(() => '```json\n' + (account.value ? JSON.stringify(account.value, null, 2) : 'No account found') + '\n```')
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
h4 {
  &:first-of-type {
    margin-top: 3rem;
  }
}
</style>
