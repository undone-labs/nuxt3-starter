// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useAuthorized = (perm, method) => {
  const authStore = useZeroAuthStore()
  const { user } = storeToRefs(authStore)
  const orgStore = useZeroOrgStore()
  const { organization } = storeToRefs(orgStore)

  const role = organization.value.roles.find(role => role.users.includes(user.value._id))
  if (!role) { return false }

  const userAccessLevel = role.permissions[perm]
  let allowed = false
  if (method !== 'no-access' && (userAccessLevel === 'read-write' || userAccessLevel === method)) {
    allowed = true
  }
  return allowed
}
