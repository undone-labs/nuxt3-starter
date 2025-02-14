# Api Overview


A component to document an API. Displays API headers, query params, body params, path params and response codes using the [Zero Markdown Parser](/zero-core/modules/markdown-parser/components/zero-markdown-parser).

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `headers`<span>(optional)</span> | object\|boolean | An object containing nested header objects. The top level key associated with each nested header object is the name of that respective header. Each nested header object should have the following keys:<ul><li>`type` - **type:** `string` - The type of the header.</li><li>`description` - **type:** `string` - A description of the header. This can be a markdown string as it will be displayed using the [Zero Markdown Parser](/zero-core/modules/markdown-parser/components/zero-markdown-parser).</li></ul> |  |
| `queryParameters`<span>(optional)</span> | object\|boolean | An object containing nested query param objects. The top level key associated with each nested object is the name of that respective query param. Each nested object should have the following keys:<ul><li>`type` - **type:** `string` - The type of the query param.</li><li>`description` - **type:** `string` - A description of the query param. This can be a markdown string as it will be displayed using the [Zero Markdown Parser](/zero-core/modules/markdown-parser/components/zero-markdown-parser).</li></ul> |  |
| `bodyParameters`<span>(optional)</span> | object\|boolean | An object containing nested body param objects. The top level key associated with each nested object is the name of that respective body param. Each nested object should have the following keys:<ul><li>`type` - **type:** `string` - The type of the body param.</li><li>`description` - **type:** `string` - A description of the body param. This can be a markdown string as it will be displayed using the [Zero Markdown Parser](/zero-core/modules/markdown-parser/components/zero-markdown-parser).</li></ul> |  |
| `pathParameters`<span>(optional)</span> | object\|boolean | An object containing nested path param objects. The top level key associated with each nested object is the name of that respective path param. Each nested object should have the following keys:<ul><li>`type` - **type:** `string` - The type of the path param.</li><li>`description` - **type:** `string` - A description of the path param. This can be a markdown string as it will be displayed using the [Zero Markdown Parser](/zero-core/modules/markdown-parser/components/zero-markdown-parser).</li></ul> |  |
| `responseCodes`<span>(optional)</span> | object\|boolean | An object containing nested response code objects. The top level key associated with each object should be the number code for the response.<ul><li>`description` - **type:** `string` - A description of the response. This usually will include code examples to be displayed by the [Zero Markdown Parser](/zero-core/modules/markdown-parser/components/zero-markdown-parser).</li></ul> |  |

## Methods

#### getHeading()


Returns a human readable title for each API section based on the prop name of that section.

| param | type | description |
| ----- | ---- | ----------- |
| `key` | string | The section to get the title for. Must be one of `headers`, `query_parameters`, `body_parameters`, `path_parameters` or `response_codes`. |
| `subsection` | Object | One of the props objects outlined above. A custom heading for each section can be supplied to override the defaults by including a `_subsection_heading` key at the top level of any respective prop object outlined above. |
