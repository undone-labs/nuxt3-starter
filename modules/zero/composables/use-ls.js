// ////////////////////////////////////////////////////////////////// [Class] Ls
// -----------------------------------------------------------------------------
class Ls {
  // =============================================================== constructor
  constructor (options) {
    this.prefix = options.prefix
  }

  // ======================================================================= get
  get (key) {
    return localStorage.getItem(`${this.prefix}${key}`)
  }

  // ======================================================================= set
  set (key, value) {
    localStorage.setItem(`${this.prefix}${key}`, value)
  }

  // ==================================================================== remove
  remove (key) {
    localStorage.removeItem(`${this.prefix}${key}`)
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useLs = () => {
  const config = useRuntimeConfig()
  return new Ls(config.public.ls)
}
