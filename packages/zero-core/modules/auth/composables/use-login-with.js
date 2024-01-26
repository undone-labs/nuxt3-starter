// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useLoginWith = loginWith => {
  const strategy = loginWith.strategy
  const options = loginWith.options
  switch (strategy) {
    case 'github': useAuthenticateGithub(options); break
    case 'metamask': useAuthenticateMetamask(options); break
  }
}
