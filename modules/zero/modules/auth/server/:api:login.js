// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineEventHandler } from '#imports'

import useFetchAuthNitro from '@/modules/zero/modules/auth/composables/use-fetch-auth-nitro'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineEventHandler(async (event) => {
  try {
    const response = await useFetchAuthNitro(event, {
      url: '/login',
      method: 'post',
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    return response._data.payload
    // return {
    //   session: data.payload,
    //   toast: {
    //     type: 'toast',
    //     code: data.code,
    //     category: 'success',
    //     message: data.message
    //   }
    // }
  } catch (e) {
    return false
    // return {
    //   session: null,
    //   toast: {
    //     type: 'toast',
    //     code: data.code,
    //     category: 'success',
    //     message: data.message
    //   }
    // }
  }
})
