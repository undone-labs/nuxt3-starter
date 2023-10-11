// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { ref } from '#imports'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useGeneralStore = defineStore('general', () => {
  // ===================================================================== state
  const clipboard = ref(false)
  const theme = ref('light')

  // =================================================================== actions

  /**
   * @method setTheme
   */

  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    document.documentElement.className = newTheme
  }

  // ==================================================================== return
  return {
    // ----- state
    clipboard,
    theme,
    // ----- actions
    setTheme
  }
})
