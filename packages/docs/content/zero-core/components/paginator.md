# Paginator




## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `buffer`<span>(optional)</span> | number |  |  |
| `limit` | number |  |  |
| `offset` | number |  |  |
| `total` | number |  |  |

## Slots

| name | scoped | bindings |
| ---- | ------ | -------- |
| before | `false` |  |
| first | `true` | `increment-page` |
| prev | `true` | `increment-page` |
| breaker-left | `false` |  |
| page | `true` | `page` `increment-page` |
| breaker-right | `false` |  |
| next | `true` | `increment-page` |
| last | `true` | `increment-page` |
| after | `false` |  |

### Emitters


 - pageIncremented - undefined
