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

  const response = await $fetch.raw(url, {
    method,
    baseURL: backendUrl,
    credentials: 'include',
    headers: { cookie: headers.cookie },
    ...(config.public.serverFlag === 'development' && {
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

  if (!response._data && response.status) {
    throw createError({
      statusCode: e.response.status,
      statusMessage: e.message,
      data: e.data,
    })
  }

  return response._data.payload
})
