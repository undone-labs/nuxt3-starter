/**
 * @note only use for requests from client to backend
 */

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useFetchAuth = async (body = {}) => {
  try {
    const { data } = await useFetch('/api/fetch-auth', {
      method: 'post',
      body
    })
    return data.value
  } catch (e) {
    console.log(e)
  }
}
