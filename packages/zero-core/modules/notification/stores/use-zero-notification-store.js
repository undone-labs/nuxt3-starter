// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroNotificationStore = defineStore('zero-notification', () => {
  // ===================================================================== state
  const notificationList = ref(null)
  const newCount = ref(0)
  const loading = ref(false)
  const metadata = ref({
    page: 1,
    limit: 10,
    totalPages: 1
  })

  // ================================================================== computed
  const notificationsEmpty = computed(() => !notificationList.value || notificationList.value === 0)
  const prevPageExists = computed(() => metadata.value.page > 1)
  const nextPageExists = computed(() => metadata.value.page !== metadata.value.totalPages)

  // =================================================================== actions

  /**
   * @method getNotificationList
   * ---------------------------------------------------------------------------
   */

  const getNotificationList = async page => {
    try {
      loading.value = true
      if (typeof page === 'number') {
        setMetadata({ page })
      }
      const response = await useFetchAuth('/get-notification-list', {
        method: 'get',
        query: metadata.value
      })
      const results = response.results
      notificationList.value = results.length > 0 ? results : null
      setMetadata(response.metadata)
      getNewNotificationCount()
      loading.value = false
    } catch (e) {
      useHandleFetchError(e)
      loading.value = false
    }
  }

  /**
   * @method setMetadata
   * ---------------------------------------------------------------------------
   */

  const setMetadata = payload => {
    Object.assign(metadata.value, payload)
  }

  /**
   * @method getNewNotificationCount
   * ---------------------------------------------------------------------------
   */

  const getNewNotificationCount = async () => {
    try {
      newCount.value = await useFetchAuth('/get-new-notification-count', {
        method: 'get'
      })
    } catch (e) {
      useHandleFetchError(e)
    }
  }

  /**
   * @method markNotificationsAsRead
   * ---------------------------------------------------------------------------
   */

  const markNotificationsAsRead = async notificationIds => {
    try {
      loading.value = true
      await useFetchAuth('/post-mark-notifications-read', {
        method: 'post',
        body: {
          notificationIds
        }
      })
      notificationIds.forEach(id => {
        const index = notificationList.value.findIndex(obj => obj._id === id)
        notificationList.value[index].read = true
      })
      getNewNotificationCount()
      loading.value = false
    } catch (e) {
      useHandleFetchError(e)
      loading.value = false
    }
  }

  /**
   * @method markAllNotificationsAsRead
   * ---------------------------------------------------------------------------
   */

  const markAllNotificationsAsRead = async () => {
    try {
      loading.value = true
      await useFetchAuth('/post-mark-all-notifications-read', {
        method: 'post'
      })
      notificationList.value.forEach(notification => {
        notification.read = true
      })
      getNewNotificationCount()
      loading.value = false
    } catch (e) {
      useHandleFetchError(e)
      loading.value = false
    }
  }

  /**
   * @method postPushNotification
   * ---------------------------------------------------------------------------
   */

  const pushNotification = async payload => {
    try {
      await useFetchAuth('/post-push-notification', {
        method: 'post',
        body: payload
      })
    } catch (e) {
      useHandleFetchError(e)
    }
  }

  // ==================================================================== return
  return {
    // ----- state
    notificationList,
    newCount,
    loading,
    metadata,
    // ----- computed
    notificationsEmpty,
    prevPageExists,
    nextPageExists,
    // ----- actions
    getNotificationList,
    setMetadata,
    getNewNotificationCount,
    markNotificationsAsRead,
    markAllNotificationsAsRead,
    pushNotification
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useZeroNotificationStore, import.meta.hot))
}
