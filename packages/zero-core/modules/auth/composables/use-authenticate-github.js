// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import zeroOpenPopup from '@/../zero-core/composables/open-popup'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useAuthenticateGithub = options => {
  const config = useRuntimeConfig().public.auth.github
  zeroOpenPopup({
    id: 'authenticate-github',
    url: config[options.type],
    title: 'authenticate-github-popup',
    w: 600,
    h: 600
  })
}
