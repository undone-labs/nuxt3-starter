<template>
  <main class="page login-github-app">

    <component
      :is="resolveComponent()"
      v-if="resolveComponent()"
      class="custom-login-page" />

    <div v-else class="specific">
      <div class="text">
        Finalizing
      </div>
      <div class="triple-dot-loader">
        <div class="dot dot-1"></div>
        <div class="dot dot-2"></div>
        <div class="dot dot-3"></div>
      </div>
    </div>

  </main>
</template>

<script setup>
// ======================================================================= Setup
definePageMeta({
  layout: 'zero-auth-layout',
  authenticate: false
})

useHead({ title: 'Finalizing' })

// ======================================================================== Data
const route = useRoute()
const config = useRuntimeConfig()

// ======================================================================= Hooks
onMounted(async () => {
  if (!window.opener && window.opener !== window && window.name !== 'authenticate-github-popup') {
    await navigateTo('/')
  }
  animateTitle()
  const session = await useFetchAuth('/login', {
    method: 'post',
    query: Object.assign(route.query, { strategy: 'github', type: 'app' }),
    body: {}
  })
  window.opener.postMessage({
    id: 'authenticate-github-app',
    session
  }, config.public.siteUrl)
  window.close()
})

// ===================================================================== Methods
/**
 * @method resolveComponent
 */

const resolveComponent = () => {
  const instance = getCurrentInstance()
  const compToResolve = 'LoginGithubAppLoading'
  if (typeof instance?.appContext.components === 'object' && compToResolve in instance.appContext.components) {
    return compToResolve
  }
  return false
}

/**
 * @method animateTitle
 */

const animateTitle = () => {
  let dots = ['.']
  setInterval(() => {
    dots.length === 3 ? dots = ['.'] : dots.push('.')
    useHead({
      title: `Finalizing${dots.join('')}`
    })
  }, 250)
}
</script>

<style lang="scss" scoped>
@keyframes dot {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
}

// ///////////////////////////////////////////////////////////////////// General
.page {
  width: 100%;
  height: 100%;
}

.custom-login-page {
  width: 100%;
  height: 100%;
}

.specific {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .triple-dot-loader {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 100%;
    display: inline-block;
    animation: dot 1.4s infinite ease-in-out both;
    transition: 250ms ease-in-out;
    &.dot-1 {
      animation-delay: -0.32s;
    }
    &.dot-2 {
      animation-delay: -0.16s;
      margin: 0 0.25rem;
    }
  }
  .text {
    font-family: monospace;
    margin-right: 1rem;
  }
}
</style>
