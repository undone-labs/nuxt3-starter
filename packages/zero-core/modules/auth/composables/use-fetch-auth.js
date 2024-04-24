/**
 * @note only use for requests from client to backend
 */

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useFetchAuth = async (url, body = {}) => {
  body.url = url.charAt(0) !== '/' ? url = `/${url}` : url
  const headers = Object.assign(
    {},
    body.headers || {},
    useRequestHeaders(['cookie'])
  )
  try {
    const response = await $fetch.raw('/api/fetch-auth', {
      method: 'post',
      headers,
      body
    })
    return response._data
  } catch (e) {
    throw e
  }
}
