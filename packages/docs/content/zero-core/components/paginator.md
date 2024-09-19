# Paginator




## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `buffer`<span>(optional)</span> | number |  |  |
| `limit` | number |  |  |
| `offset` | number |  |  |
| `total` | number |  |  |

## Slots

##### Before


**name:** `before`  **scoped:** `false`

##### First


**name:** `first`  **scoped:** `true`

| binding | type | description |
| ------- | ---- | ----------- |
| `increment-page` |  |  |

##### Prev


**name:** `prev`  **scoped:** `true`

| binding | type | description |
| ------- | ---- | ----------- |
| `increment-page` |  |  |

##### Breaker Left


**name:** `breaker-left`  **scoped:** `false`

##### Page


**name:** `page`  **scoped:** `true`

| binding | type | description |
| ------- | ---- | ----------- |
| `page` |  |  |
| `increment-page` |  |  |

##### Breaker Right


**name:** `breaker-right`  **scoped:** `false`

##### Next


**name:** `next`  **scoped:** `true`

| binding | type | description |
| ------- | ---- | ----------- |
| `increment-page` |  |  |

##### Last


**name:** `last`  **scoped:** `true`

| binding | type | description |
| ------- | ---- | ----------- |
| `increment-page` |  |  |

##### After


**name:** `after`  **scoped:** `false`

## Emitters


 - **pageIncremented** - undefined
