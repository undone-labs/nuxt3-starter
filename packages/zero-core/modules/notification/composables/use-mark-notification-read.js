// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroNotificationStore } from '../stores/use-zero-notification-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useMarkNotificationRead = notification => {
  if (!notification.read) {
    useZeroNotificationStore().markNotificationsAsRead([notification._id])
  }
}
