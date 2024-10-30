// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '../stores/use-zero-auth-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useLoginWith = loginWith => {
  const store = useZeroAuthStore()
  store.setAuthState('authenticating')
  const strategy = loginWith.strategy
  store.setAuthStrategy(strategy)
  const options = loginWith.options
  switch (strategy) {
    case 'github': useAuthenticateGithub(options); break
    case 'metamask': useAuthenticateMetamask(options); break
    case 'google': useAuthenticateGoogle(options); break
    case 'microsoft': useAuthenticateMicrosoft(options); break
  }
}
