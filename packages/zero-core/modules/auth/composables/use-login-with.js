// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '../stores/use-zero-auth-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useLoginWith = loginWith => {
  useZeroAuthStore().setAuthState('authenticating')
  const strategy = loginWith.strategy
  const options = loginWith.options
  switch (strategy) {
    case 'github': useAuthenticateGithub(options); break
    case 'metamask': useAuthenticateMetamask(options); break
  }
}
