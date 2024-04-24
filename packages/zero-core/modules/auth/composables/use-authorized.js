// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useAuthorized = (perm, method) => {
  const authStore = useZeroAuthStore()
  const { user } = storeToRefs(authStore)
  const workspaceStore = useZeroWorkspaceStore()
  const { workspace } = storeToRefs(workspaceStore)

  const role = workspace.value.roles.find(role => role.users.includes(user.value._id))
  if (!role) { return false }

  const userAccessLevel = role.permissions[perm]
  let allowed = false
  if (method !== 'no-access' && (userAccessLevel === 'read-write' || userAccessLevel === method)) {
    allowed = true
  }
  return allowed
}
