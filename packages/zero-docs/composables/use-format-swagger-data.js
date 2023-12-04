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
  let bodyParams = false
  let pathParams = false
  parameters.forEach(async (param) => {
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
            description: param.description,
            required: param.required
          }
          : paramHeaders = {}
            paramHeaders[name] = {
              type: param.type,
              description: param.description,
              required: param.required
            }
        break
      case 'query':
        queryParams
          ? queryParams[name] = {
              type: param.type,
              description: param.description,
              required: param.required
            }
          : queryParams = {}
            queryParams[name] = {
            type: param.type,
            description: param.description,
            required: param.required
            }
        break
      case 'body':
        const type = requestTypeStringFromSchema(param.schema, definitions)
        bodyParams = {}
        bodyParams[name] = {
          type,
          description: param.description,
          required: param.required
          }
        break
      case 'path':
        pathParams
          ? pathParams[name] = {
            type: param.type,
            description: param.description,
            required: param.required
          }
          : pathParams = {}
            pathParams[name] = {
            type: param.type,
            description: param.description,
            required: param.required
            }
        break
      // other param (Parameter Object) possible value of param.in are 'formData'
    }
  })
  return { paramHeaders, queryParams, bodyParams, pathParams }
}

// ///////////////////////////////////////////////// requestTypeStringFromSchema
const requestTypeStringFromSchema = (schemaObject, definitions) => {
  const createTypeString = (schema, defs) => {
    if (schema.type) {
      let typeString = Array.isArray(schema.type)
        ? schema.type.reduce((str, primitiveType, i, array) => {
          if (i === array.length - 1) {
            return str.concat(primitiveType)
          }
          return str.concat(primitiveType, ' or ')
        }, '')
        : schema.type
      if (typeString.includes('array')) {
        const itemsSchema = resolveRef(schema.items.$ref, defs) || schema.items.type
        typeof itemsSchema === 'string'
          ? typeString = typeString.concat(' of ', itemsSchema, 's')
          : typeString = typeString.concat(' of ', itemsSchema.type, 's')
      }
      return typeString
    }
  }
  // ------------- if Schema Object is $ref, resolve $ref then build type string
  if (schemaObject.$ref) {
    const resolvedSchemaRef = resolveRef(schemaObject.$ref, definitions)
    return createTypeString(resolvedSchemaRef, definitions)
  }
  // ------------------------------------------ otherwise just build type string
  return createTypeString(schemaObject, definitions)
}

// /////////////////////////////////////////////////////////// resolveRef



// ////////////////////////////////////////////////////////////////// resolveRef
const resolveRef = (ref, definitions) => {
  if (typeof ref === 'undefined') { return false }
  const refPath = ref.slice(14).split('/')
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
  const { swagger, info, host, basePath, paths, preview } = swaggerObject
  let headers
  let queryParameters
  let bodyParameters
  let pathParameters
  const responseCodes = {}

  Object.keys(paths).forEach((path) => {
    Object.keys(paths[path]).forEach(requestMethod => {
      // const pathSlug = path.slice(1)

      const requestMethodConfig = paths[path][requestMethod]
      // ------------ overview + preview: compile header values and query params
      const { paramHeaders, queryParams, bodyParams, pathParams } = getHeadersAndQueryParams(requestMethodConfig.parameters, definitions)
      headers = paramHeaders ? {...paramHeaders} : false
      queryParameters = queryParams ? {...queryParams} : false
      bodyParameters = bodyParams ? {...bodyParams} : false
      pathParameters = pathParams ? {...pathParams} : false
      Object.keys(requestMethodConfig.responses).forEach(code => {
        const response = requestMethodConfig.responses[code]
      //   // -------------------------------- overview: compile HTTP request codes
        responseCodes[code] = response.description
      })
    })
  })
  return { overview: { headers, queryParameters, bodyParameters, pathParameters, responseCodes }, preview }
}
