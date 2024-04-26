// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '../stores/use-zero-auth-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtRouteMiddleware(async (to, from) => {
  useZeroAuthStore().setNavPaths({
    navigationType: process.server ? 'server' : 'client',
    from: {
      fullPath: from.fullPath,
      path: from.path,
      query: from.query,
      hash: from.hash,
      name: from.name,
      params: from.params,
      meta: from.meta,
      href: from.href
    },
    to: {
      fullPath: to.fullPath,
      path: to.path,
      query: to.query,
      hash: to.hash,
      name: to.name,
      params: to.params,
      meta: to.meta,
      href: to.href
    }
  })
})
