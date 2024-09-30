/**
 * @module zeroOpenPopup
 * @desc A composable to create a new open window that navigates to a provided URL.
 */

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useRuntimeConfig } from '#imports'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
/**
 * @method zeroOpenPopup
 * @desc Opens a popup window.
 * @param {string} id An ID for the call to the window `postMessage` method. Adds an interval to check if the popup is closed every 100ms. If the window is closed a message is posted to the original window with the popup ID and action.
 * @param {action} string
 * @param {string} url The URL the new window should navigate to.
 * @param {string} title A title for the new window.
 * @param {number} w The width of the popup window.
 * @param {number} h The height of the popup window.
 */

export default ({ id, action, url, title, w, h }) => {
  const config = useRuntimeConfig()
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY
  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height
  const left = (width - w) / 2 + dualScreenLeft
  const top = (height - h) / 2 + dualScreenTop
  const newWindow = window.open(url, title, `
    scrollbars=yes,
    width=${w},
    height=${h},
    top=${top},
    left=${left}
  `)
  const interval = setInterval(() => {
    if (newWindow.closed) {
      window.postMessage({
        id,
        action: 'close-popup'
      }, config.public.siteUrl)
      clearInterval(interval)
    }
  }, 100)
  if (window.focus) { newWindow.focus() }
  /**
   * Old code that didn't quite work properly but did take into account systemZoom.
   * Leaving here for future reference
   */
  // const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
  // const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY
  // const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  // const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height
  // const systemZoom = width / window.screen.availWidth
  // const left = (width - w) / 2 / systemZoom + dualScreenLeft
  // const top = (height - h) / 2 / systemZoom + dualScreenTop
  // const newWindow = window.open(url, title, `
  //   scrollbars=yes,
  //   width=${w / systemZoom},
  //   height=${h / systemZoom},
  //   top=${top},
  //   left=${left}
  // `)
  // if (window.focus) newWindow.focus()
}
