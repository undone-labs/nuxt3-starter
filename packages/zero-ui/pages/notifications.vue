<template>
  <main class="page">

    <h1 class="page-heading">
      Notifications
    </h1>

    <ZeroButton @clicked="addNotification">
      Add Notification
    </ZeroButton>

    <!-- =========================================================== Toolbar -->
    <div class="toolbar">
      <div class="new-notification-count">
        {{ newCount }} new notification{{ newCount === 1 ? '' : 's' }}
      </div>
      <div v-if="loading">
        Loading...
      </div>
      <ZeroButton @clicked="notificationStore.getNotificationList()">
        Refresh Notifications
      </ZeroButton>
    </div>

    <!-- ================================================= Notification list -->
    <div v-if="notificationList" class="notification-list">
      <div
        v-for="notification in notificationList"
        :key="notification._id"
        class="notification">
        <div class="panel-top">
          <div class="read-unread">
            {{ notification.read ? 'read' : 'unread' }}
          </div>
          <ZeroButton @clicked="markRead(notification)">
            Mark as read
          </ZeroButton>
        </div>
        <pre><code>{{ notification }}</code></pre>
      </div>
    </div>

    <!-- ================================================= Empty placeholder -->
    <div v-else class="no-notifications-placeholder">
      ☀️ you don't have any notifications
    </div>

    <!-- ============================================ Mark read & Pagination -->
    <footer v-if="notificationList" class="footer">
      <ZeroButton
        :disabled="newCount === 0"
        @clicked="notificationStore.markAllNotificationsAsRead()">
        Mark all as read
      </ZeroButton>
      <div class="pagination">
        <button
          :class="['prev', { disabled: prevPageDisabled }]"
          :disabled="prevPageDisabled"
          @click="iteratePage('prev', metadata.page - 1)">
          <!-- eslint-disable -->
          <svg width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.822 3.206L1.596 6.426H0L1.89 3.206L0 0H1.596L3.822 3.206Z" fill="white" fill-opacity="0.9" />
          </svg>
          <!-- eslint-enable -->
        </button>
        <div class="page">
          {{ metadata.page }}/{{ metadata.totalPages }}
        </div>
        <button
          :class="['next', { disabled: nextPageDisabled }]"
          :disabled="nextPageDisabled"
          @click="iteratePage('next', metadata.page + 1)">
          <!-- eslint-disable -->
          <svg width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.822 3.206L1.596 6.426H0L1.89 3.206L0 0H1.596L3.822 3.206Z" fill="white" fill-opacity="0.9" />
          </svg>
          <!-- eslint-enable -->
        </button>
      </div>
    </footer>

  </main>
</template>

<script setup>
// ======================================================================== Data
const notificationStore = useZeroNotificationStore()
const {
  loading,
  notificationList,
  newCount,
  metadata
} = storeToRefs(notificationStore)

// const { data: content } = await useAsyncData('alert-content', () => {
//   return queryContent({
//     where: {
//       _path: { $contains: '/zero-ui/alert' }
//     }
//   }).find()
// })

// ==================================================================== Computed
const prevPageDisabled = computed(() => metadata.value.page === 1)
const nextPageDisabled = computed(() => metadata.value.page === metadata.value.totalPages)

// ======================================================================= Hooks
onMounted(() => {
  notificationStore.getNewNotificationCount()
  notificationStore.getNotificationList()
})

// ===================================================================== Methods
/**
 * @method addNotification
 */
const addNotification = () => {
  notificationStore.pushNotification({
    id: zeroUuid().v4()
  })
}

/**
 * @method iteratePage
 */
const iteratePage = (action, page) => {
  if ((action === 'prev' && prevPageDisabled.value) || (action === 'next' && nextPageDisabled.value)) { return }
  notificationStore.getNotificationList(page)
}

/**
 * @method markRead
 */
const markRead = notification => {
  if (!notification.read) {
    notificationStore.markNotificationsAsRead([notification._id])
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.button {
  padding: toRem(5) toRem(10);
  border-radius: toRem(4);
  border: 1px solid $alto;
  &:hover,
  &:focus-visible {
    background-color: $melrose;
  }
}

// ///////////////////////////////////////////////////////////////////// Toolbar
.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.new-notification-count {
  font-weight: 700;
}

// /////////////////////////////////////////////////////////////// Notifications
.notification-list {
  max-height: 25rem;
  padding: 0 1rem;
  margin-top: 1rem;
  border-radius: toRem(4);
  border: 1px solid $alto;
  overflow-y: scroll;
}

.no-notifications-placeholder {
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid $alto;
  border-radius: toRem(4);
}

.notification {
  margin: 1rem 0;
}

.panel-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

pre {
  margin: 0;
}

code {
  font-size: toRem(12);
}

// ////////////////////////////////////////////////////////////////////// Footer
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.prev,
.next {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  &:not(.disabled):hover {
    &:before {
      transition: 150ms ease-in;
      opacity: 1;
    }
    svg {
      transition: 150ms ease-in;
      transform: scale(1.2);
    }
  }
  &.disabled {
    cursor: no-drop;
    opacity: 0.5;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: calc(100% - 0.5rem);
    height: calc(100% - 0.5rem);
    background-color: rgba(246, 245, 255, 0.2);
    border-radius: toRem(3);
    opacity: 0;
    transition: 150ms ease-out;
  }
  svg {
    transition: 150ms ease-out;
    path {
      fill: black;
    }
  }
}

.prev {
  &:not(.disabled):hover {
    svg {
      transform: rotate(180deg) scale(1.2);
    }
  }
  svg {
    transform: rotate(180deg);
  }
}
</style>
