/* eslint-disable no-unused-vars */
// /////////////////////////////////////////////////////////////////////// Notes
// -----------------------------------------------------------------------------
// anything referenced in comments in Title Case is part of the OpenAPI
//  specification and details can be found in the docs
//  https://spec.openapis.org/oas/v3.1.0

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// //////////////////////////////////////////////////// getHeadersAndQueryParams
const getHeadersAndQueryParams = (parameters, definitions) => {
  let paramHeaders = false
  let queryParams = false
  parameters.forEach((param) => {
    const name = param.name
    switch (param.in) {
      case 'header':
        // OpenAPI ignores Parameter Objects where .in is 'header' and .name is 'accept', 'content-type' or 'authorization'
        // - accept is set by the Media Type keys in openApiObject.paths.<path>.get.responses.<code>.content ( .<code> is a Response Object)
        // - content-type is defined in the same Respons`e Object as accept, see Media Type Object docs for details
        // - authorization is set in openApiObject.security.<reference to openApiObject.components.securitySchemes.<Security Schemes Object>
        // accept header is included in the parameters for get-cats.json so the logic to compile docs copy is less complicated
        paramHeaders
          ? paramHeaders[name] = {
            type: param.type,
            description: param.description
          }
          : paramHeaders = {}
            paramHeaders[name] = {
              type: param.type,
              description: param.description
            }
        break
      case 'query':
        queryParams
          ? queryParams[name] = {
              type: param.type,
              description: param.description
            }
          : queryParams = {}
            queryParams[name] = {
              type: param.type,
              description: param.description
            }
      break
      // other param (Parameter Object) possible values of param.in are 'path', 'formData', or 'body
    }
  })
  return { paramHeaders, queryParams, }
}

// /////////////////////////////////////////////////////////// resolveDefinition
const resolveDefinition = (ref, definitions) => {
  if (typeof ref === 'undefined') { return false }
  const inSameFile = ref.startsWith('#definitions/')
  const refPath = inSameFile ? ref.slice(13).split('/') : null
  let refValue = refPath.reduce((value, key) => value[key], definitions)
  return refValue
}

// ////////////////////////////////////////////////////////////// getEndpointUrl
const getEndpointUrl = (path, basePath = false, domain = false, ) => {
  // basePath is stored in <Server Object>.variables which can also store other
  //  variables for URL template substitution
  if (domain) {
    if (basePath) {
      const domainBasePath = domain.replace('{basePath}', basePath)
      return `${domainBasePath}${path}`
    }
    return `${domain}${path}`
  }
  if (basePath) {
      return `${basePath}${path}`
  }
  return path
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useFormatSwaggerData = (swaggerObject, definitions) => {
  const { swagger, info, host, basePath, paths } = swaggerObject
  let headers
  let queryParameters
  const responseCodes = {}

  Object.keys(paths).forEach((path) => {
    Object.keys(paths[path]).forEach(requestMethod => {
      const pathSlug = path.slice(1)

      const requestMethodConfig = paths[path][requestMethod]
      // ------------ overview + preview: compile header values and query params
      const { paramHeaders, queryParams} = getHeadersAndQueryParams(requestMethodConfig.parameters, definitions)
      headers = paramHeaders ? {...paramHeaders} : false
      queryParameters = queryParams ? {...queryParams} : false
      Object.keys(requestMethodConfig.responses).forEach(code => {
        const response = requestMethodConfig.responses[code]
      //   // -------------------------------- overview: compile HTTP request codes
        responseCodes[code] = response.description
      })
    })
  })
  return { headers, queryParameters, responseCodes }
}
