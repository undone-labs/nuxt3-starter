<template>
  <div v-if="headers || queryParameters || responseCodes" class="api-overview">

    <!-- =========================================================== headers -->
    <div v-if="headers" class="headers subsection">
      <div class="heading">
        {{ getHeading('headers', headers) }}
      </div>
      <template v-for="(header, key) in props.headers">
        <div
          v-if="key !== '_subsection_heading'"
          :key="key"
          class="entry">
          <div class="metadata">
            <div class="key">
              {{ key }}
            </div>
            <div class="type">
              {{ header.type }}
            </div>
          </div>
          <ZeroMarkdownParser
            v-if="header.description"
            :markdown="header.description"
            class="description" />
        </div>
      </template>
    </div>

    <!-- ================================================== query parameters -->
    <div v-if="queryParameters" class="query-parameters subsection">
      <div class="heading">
        {{ getHeading('query_parameters', queryParameters) }}
      </div>
      <template v-for="(parameter, key) in props.queryParameters">
        <div
          v-if="key !== '_subsection_heading'"
          :key="key"
          class="entry">
          <div class="metadata">
            <div class="key">
              {{ key }}
            </div>
            <div class="type">
              {{ parameter.type }}
            </div>
          </div>
          <ZeroMarkdownParser
            v-if="parameter.description"
            :markdown="parameter.description"
            class="description" />
        </div>
      </template>
    </div>

    <!-- =================================================== body parameters -->
    <div v-if="bodyParameters" class="body-parameters subsection">
      <div class="heading">
        {{ getHeading('body_parameters', bodyParameters) }}
      </div>
      <template v-for="(parameter, key) in props.bodyParameters">
        <div
          v-if="key !== '_subsection_heading'"
          :key="key"
          class="entry">
          <div class="metadata">
            <div class="key">
              {{ key }}
            </div>
            <div class="type">
              {{ parameter.type }}
            </div>
          </div>
          <ZeroMarkdownParser
            v-if="parameter.description"
            :markdown="parameter.description"
            class="description" />
        </div>
      </template>
    </div>

    <!-- =================================================== path parameters -->
    <div v-if="pathParameters" class="path-parameters subsection">
      <div class="heading">
        {{ getHeading('path_parameters', pathParameters) }}
      </div>
      <template v-for="(parameter, key) in props.pathParameters">
        <div
          v-if="key !== '_subsection_heading'"
          :key="key"
          class="entry">
          <div class="metadata">
            <div class="key">
              {{ key }}
            </div>
            <div class="type">
              {{ parameter.type }}
            </div>
          </div>
          <ZeroMarkdownParser
            v-if="parameter.description"
            :markdown="parameter.description"
            class="description" />
        </div>
      </template>
    </div>

    <!-- ==================================================== response codes -->
    <div v-if="responseCodes" class="response-codes subsection">
      <div class="heading">
        {{ getHeading('response_codes', responseCodes) }}
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Status Code</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(description, code) in props.responseCodes">
            <tr
              v-if="code !== '_subsection_heading'"
              :key="code">
              <td>
                <div class="http-code">
                  {{ code }}
                </div>
              </td>
              <td>
                <ZeroMarkdownParser
                  v-if="description"
                  :markdown="description"
                  class="description" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
/**
 * @description A component to document an API. Displays API headers, query params, body params, path params and response codes using the [Zero Markdown Parser](/zero-core/modules/markdown-parser/components/zero-markdown-parser).
 */
// ======================================================================= Props
const props = defineProps({
  /**
   * An object containing nested header objects. The top level key associated with each nested header object is the name of that respective header. Each nested header object should have the following keys:
   * @param {string} type The type of the header.
   * @param {string} description A description of the header. This can be a markdown string as it will be displayed using the [Zero Markdown Parser](/zero-core/modules/markdown-parser/components/zero-markdown-parser).
   */
  headers: {
    type: [Object, Boolean],
    required: false,
    default: undefined
  },
  /**
   * An object containing nested query param objects. The top level key associated with each nested object is the name of that respective query param. Each nested object should have the following keys:
   * @param {string} type The type of the query param.
   * @param {string} description A description of the query param. This can be a markdown string as it will be displayed using the [Zero Markdown Parser](/zero-core/modules/markdown-parser/components/zero-markdown-parser).
   */
  queryParameters: {
    type: [Object, Boolean],
    required: false,
    default: undefined
  },
  /**
   * An object containing nested body param objects. The top level key associated with each nested object is the name of that respective body param. Each nested object should have the following keys:
   * @param {string} type The type of the body param.
   * @param {string} description A description of the body param. This can be a markdown string as it will be displayed using the [Zero Markdown Parser](/zero-core/modules/markdown-parser/components/zero-markdown-parser).
   */
  bodyParameters: {
    type: [Object, Boolean],
    required: false,
    default: undefined
  },
  /**
   * An object containing nested path param objects. The top level key associated with each nested object is the name of that respective path param. Each nested object should have the following keys:
   * @param {string} type The type of the path param.
   * @param {string} description A description of the path param. This can be a markdown string as it will be displayed using the [Zero Markdown Parser](/zero-core/modules/markdown-parser/components/zero-markdown-parser).
   */
  pathParameters: {
    type: [Object, Boolean],
    required: false,
    default: undefined
  },
  /**
   * An object containing nested response code objects. The top level key associated with each object should be the number code for the response.
   * @param {string} description A description of the response. This usually will include code examples to be displayed by the [Zero Markdown Parser](/zero-core/modules/markdown-parser/components/zero-markdown-parser).
   */
  responseCodes: {
    type: [Object, Boolean],
    required: false,
    default: undefined
  }
})

// ==================================================================== Headings
/**
 * @method getHeading
 * @desc - Returns a human readable title for each API section based on the prop name of that section.
 * @param {string} key The section to get the title for. Must be one of `headers`, `query_parameters`, `body_parameters`, `path_parameters` or `response_codes`.
 * @param {Object} subsection One of the props objects outlined above. A custom heading for each section can be supplied to override the defaults by including a `_subsection_heading` key at the top level of any respective prop object outlined above.
 */

const getHeading = (key, subsection) => {
  const map = {
    headers: "Headers",
    query_parameters: "Query Parameters",
    body_parameters: "Body Parameters",
    path_parameters: "Path Parameters",
    response_codes: "HTTP Response Status Codes"
  }
  return subsection._subsection_heading || map[key]
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.api-overview {
  margin-top: 3rem;
}

.subsection {
  &:not(:first-child) {
    margin-top: 3rem;
  }
}

.heading {
  @include h4;
  margin-bottom: toRem(4);
  padding-bottom: toRem(4);
  border-bottom: 1px solid var(--divider);
  transition: color 500ms, border-color 500ms;
}

.entry {
  margin-bottom: 1rem;
  padding-top: 1rem;
  transition: border-color 500ms;
  &:not(:nth-child(2)) {
    border-top: 1px solid var(--divider);
  }
}

.metadata {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.key {
  @include inlineCode;
  line-height: 1;
  font-weight: 700;
  margin-right: 0.5rem;
  transition: color 500ms, background-color 500ms;
}

.type {
  font-weight: 500;
  transition: color 500ms;
}

:deep(.description) {
  margin-top: 0.5rem;
  p {
    margin-bottom: 0;
    &:not(:last-child) {
      margin-bottom: 0.25rem;
    }
  }
}

table {
  width: 100%;
}

tbody {
  tr {
    border-top: 1px solid var(--divider);
    transition: border-color 500ms;
  }
}

.http-code,
th {
  transition: color 500ms;
}

th {
  text-align: left;
  padding-top: 1.5rem;
  padding-bottom: toRem(8);
  &:first-child {
    padding-right: 3rem;
  }
}

td {
  padding: toRem(4) 0;
  &:first-child {
    font-weight: 500;
  }
  .markdown {
    margin-top: 0;
  }
}
</style>
