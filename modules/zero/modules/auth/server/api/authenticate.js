// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineEventHandler } from '#imports'

import useFetchAuthNitro from '@/modules/zero/modules/auth/composables/use-fetch-auth-nitro'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineEventHandler(async (event) => {
  try {
    const response = await useFetchAuthNitro(event, {
      url: '/authenticate',
      method: 'post',
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    return response._data.payload
  } catch (e) {
    return false
  }
})
