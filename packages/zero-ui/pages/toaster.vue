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
    'This is a toast message',
    'This is a toast message: Nulla vel ipsum a massa auctor tristique. Donec ornare ex purus, ac rhoncus libero porttitor eget. Quisque ut mi vitae arcu egestas tempor et vitae velit.',
    'This is a toast message: Aenean ex lectus, rhoncus sed rutrum elementum, interdum quis velit.',
    'This is a toast message: Quisque gravida vel tortor sit amet eleifend. Fusce sodales vehicula diam, et congue augue pellentesque sit amet. Vestibulum pulvinar, sem a dapibus viverra, mi nibh aliquet mi, sit amet tempor quam ex quis ex. Morbi quis tincidunt arcu. Aenean turpis augue, laoreet nec mattis in, ornare eu nunc.'
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
