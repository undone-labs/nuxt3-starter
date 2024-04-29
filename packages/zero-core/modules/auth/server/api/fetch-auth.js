// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineEventHandler } from '#imports'
import { createError, readBody, appendHeader, getQuery, getRequestHeaders } from 'h3'
import { Agent } from 'undici'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const backendUrl = config.public.backendUrl
  const body = await readBody(event)
  let url = body.url
  const headers = getRequestHeaders(event)
  const params = body.query
  const method = body.method
  const data = body.body
  try {
    const response = await $fetch.raw(url, {
      method,
      baseURL: backendUrl,
      credentials: 'include',
      headers: { cookie: headers.cookie },
      ...(config.public.serverEnv === 'development' && {
        dispatcher: new Agent({
          connect: {
            rejectUnauthorized: false
          }
        })
      }),
      params,
      body: data
    })
    for (const header of ['set-cookie', 'cache-control']) {
      if (response.headers.has(header)) {
        appendHeader(event, header, response.headers.get(header))
      }
    }
    return response._data.payload
  } catch (e) {
    throw createError({
      statusCode: e?.status,
      statusMessage: e?.data?.message,
      data: e?.data
    })
  }
})
