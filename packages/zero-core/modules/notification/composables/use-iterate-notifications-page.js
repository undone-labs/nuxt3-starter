// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroNotificationStore } from '../stores/use-zero-notification-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useIterateNotificationsPage = (action, page) => {
  const store = useZeroNotificationStore()
  if ((action === 'prev' && !store.prevPageExists) || (action === 'next' && !store.nextPageExists)) { return }
  store.getNotificationList(page)
}
