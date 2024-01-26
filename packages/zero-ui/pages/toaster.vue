<template>
  <main class="page">

    <!--**
        * Toasts are displayed in `@/zero-ui/layouts/default.vue`
        * -->

    <h1 class="page-heading">
      Toaster
    </h1>

    <div class="buttons">

      <ZeroButton @clicked="createToast">
        Create Toast
      </ZeroButton>

    </div>

  </main>
</template>

<script setup>
// ======================================================================= Setup
const toasterStore = useZeroToasterStore()

// ======================================================================== Data
// const { data: content } = await useAsyncData('alert-content', () => {
//   return queryContent({
//     where: {
//       _path: { $contains: '/zero-ui/alert' }
//     }
//   }).find()
// })

// ===================================================================== Methods
/**
 * @method createToast
 */

const createToast = () => {
  const messages = [
    'You are now logged in',
    'Application updated successfully',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
  ]
  const messageIndex = Math.floor(Math.random() * (3 - 0 + 1) + 0 )
  toasterStore.addMessage({
    type: 'toast',
    message: messages[messageIndex]
  })
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.demo-form {
  padding-bottom: 1rem;
  border-radius: toRem(4);
  border: 1px solid $alto;
}

.button {
  padding: toRem(5) toRem(10);
  border-radius: toRem(4);
  border: 1px solid $alto;
  &:hover,
  &:focus-visible {
    background-color: $melrose;
  }
}

// //////////////////////////////////////////////////////////////////////// Form
</style>
