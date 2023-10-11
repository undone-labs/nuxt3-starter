// https://github.com/nuxt/nuxt/issues/14269#issuecomment-1397352832
// https://github.com/nuxt/nuxt/issues/14269#issuecomment-1700608437

// import { callWithNuxt } from '#app'
import { useZeroAuthStore } from '@/modules/zero/modules/auth/stores/use-zero-auth-store'

export default defineNuxtRouteMiddleware(async to => {
  if (process.server) { return }
  const nuxtApp = useNuxtApp()
  try {
    const headers = useRequestHeaders(['cookie'])
    const guarded = to.meta.guarded
    const store = useZeroAuthStore(nuxtApp.$pinia)
    const account = store.account
    const { data } = await useFetch('/api/authenticate', { headers, query: { guarded } })
    const authenticated = data.value
    if (authenticated) {
      store.setSession(authenticated)
      if (!account) {
        store.getAccount(authenticated.userId)
      }
    } else {
      // clearNuxtState()
    }
    if (guarded && !authenticated) {
      // return navigateTo('/zero-kitchen-sink/authentication')
    }
  } catch (e) {
    console.log(e)
    // return navigateTo('/zero-kitchen-sink/authentication')
  }
})
