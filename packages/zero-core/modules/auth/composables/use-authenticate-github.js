// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import zeroOpenPopup from '@/../zero-core/composables/open-popup'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useAuthenticateGithub = options => {
  const config = useRuntimeConfig().public.auth.github
  const state = zeroUuid().v4()
  zeroLs().set('state', state)
  zeroOpenPopup({
    id: 'authenticate-github',
    url: config[options.type] + `&state=${state}`,
    title: 'authenticate-github-popup',
    w: 600,
    h: 600
  })
}
