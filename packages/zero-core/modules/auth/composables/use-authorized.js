/**
 * This composable can be used inside <template> and inside methods in <script setup>.
 * In order to handle page-level redirection for failed authorization, please
 * use the the following in page meta:
 *
 * authorize: {
 *   permission: 'project',
 *   method: 'read-write'
 * }
 */

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useAuthorized = (perm, method) => {
  const authStore = useZeroAuthStore()
  const { user } = storeToRefs(authStore)
  const workspaceStore = useZeroWorkspaceStore()
  const { workspace } = storeToRefs(workspaceStore)

  const role = workspace.value.roles.find(role => role.users.includes(user.value?._id))
  if (!role) { return false }

  const userAccessLevel = role.permissions[perm]
  let allowed = false
  if (method !== 'no-access' && (userAccessLevel === 'read-write' || userAccessLevel === method)) {
    allowed = true
  }
  return allowed
}
