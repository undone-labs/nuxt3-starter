// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '@/modules/zero/modules/auth/stores/use-zero-auth-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtRouteMiddleware(async to => {
  const nuxtApp = useNuxtApp()
  try {
    const headers = useRequestHeaders(['cookie'])
    const meta = to.meta
    const guarded = meta.guarded
    if (meta.hasOwnProperty('authenticate') && !meta.authenticate) { return }
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
