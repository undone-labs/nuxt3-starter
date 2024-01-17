// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import CloneDeep from 'lodash/cloneDeep'
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroNotificationStore = defineStore('zero-notification', () => {
  // ===================================================================== state
  const notificationList = ref(null)
  const newCount = ref(0)
  const loading = ref(true)
  const metadata = ref({
    page: 1,
    limit: 3,
    totalPages: 1
  })

  // =================================================================== actions

  /**
   * @method getNotificationList
   */

  const getNotificationList = async page => {
    try {
      await setLoadingStatus(true)
      if (page) {
        await setMetadata({ page })
      }
      const response = await useFetchAuth('/get-notification-list', {
        method: 'get',
        query: metadata.value
      })
      const notifications = response.results
      if (notifications.length > 0) {
        notificationList.value = notifications
      }
      setMetadata(response.metadata)
      setLoadingStatus(false)
    } catch (e) {
      console.log('========= [Store Action: notifications/getNotificationList]')
      console.log(e)
      setLoadingStatus(false)
      return false
    }
  }

  /**
   * @method setLoadingStatus
   */

  const setLoadingStatus = status => {
    loading.value = status
  }

  /**
   * @method setMetadata
   */

  const setMetadata = payload => {
    metadata.value = Object.assign(CloneDeep(metadata.value), payload)
  }

  /**
   * @method getNewNotificationCount
   */

  const getNewNotificationCount = async () => {
    try {
      newCount.value = await useFetchAuth('/get-new-notification-count', { method: 'get' })
    } catch (e) {
      console.log('===== [Store Action: notifications/getNewNotificationCount]')
      console.log(e)
    }
  }

  /**
   * @method pushNotification
   */

  const pushNotification = async notification => {
    try {
      const response = await useFetchAuth('/post-push-notification', {
        method: 'post',
        body: notification
      })
      getNewNotificationCount()
      getNotificationList()
    } catch (e) {
      console.log('============ [Store Action: notifications/pushNotification]')
      console.log(e)
    }
  }

  /**
   * @method markNotificationsAsRead
   */

  const markNotificationsAsRead = async notificationIds => {
    try {
      await setLoadingStatus(true)
      const notifications = await useFetchAuth('/post-mark-notifications-read', {
        method: 'post',
        body: notificationIds
      })
      const len = notifications.length
      for (let i = 0; i < len; i++) {
        const notification = notifications[i]
        const index = notificationList.value.findIndex(obj => obj._id === notification._id)
        notificationList.value.splice(index, 1, notification)
      }
      getNewNotificationCount()
      setLoadingStatus(false)
    } catch (e) {
      console.log('===== [Store Action: notifications/markNotificationsAsRead]')
      console.log(e)
      setLoadingStatus(false)
    }
  }

  /**
   * @method markAllNotificationsAsRead
   */

  const markAllNotificationsAsRead = async () => {
    try {
      await setLoadingStatus(true)
      await useFetchAuth('/post-mark-all-notifications-read', { method: 'post' })
      const notifications = CloneDeep(notificationList.value)
      const len = notifications.length
      for (let i = 0; i < len; i++) {
        const notification = notifications[i]
        notification.read = true
        const index = notifications.findIndex(obj => obj._id === notification._id)
        notificationList.value.splice(index, 1, notification)
      }
      getNewNotificationCount()
      setLoadingStatus(false)
    } catch (e) {
      console.log('== [Store Action: notifications/markAllNotificationsAsRead]')
      console.log(e)
      setLoadingStatus(false)
    }
  }

  // ==================================================================== return
  return {
    // ----- state
    notificationList,
    newCount,
    loading,
    metadata,
    // ----- actions
    getNotificationList,
    getNewNotificationCount,
    pushNotification,
    markNotificationsAsRead,
    markAllNotificationsAsRead
  }
})
