
# useZeroAlertStore()


A store that registers [Alert component](/zero-core/modules/alert/components) instances, records their open/closed states and contains methods to update them.

## Data


 - [alerts](#alerts)

## Methods


 - [setAlert()](#setalert)
 - [getAlert()](#getalert)
 - [removeAlert()](#removealert)
 - [updateAlertData()](#updatealertdata)
 - [openAlert()](#openalert)
 - [closeAlert()](#closealert)

## All Members 

#### alerts


**type:** `Object`


An object that maps alert IDs to nested tracking objects for each [Alert component](/zero-core/modules/alert/components) instance. The top level key referencing each nested alert object is that alert's AlertId.


**Kind:** inner ref of [useZeroAlertStore](#usezeroalertstore)

#### setAlert()


Register an alert instance.


**Kind:** inner method of [useZeroAlertStore](#usezeroalertstore)

| param | type | description |
| ----- | ---- | ----------- |
| `payload` | Object | A tracking object containing data about an alert instance. |
| `payload.id` | string | The Alert ID. |
| `payload.status` | string | The status of the alert; either `open` or `closed`. |
| `payload.data`<span>(optional)</span> | any | Data to associate with the alert. |

#### getAlert()


Returns a single alert object stored at a key in the [alerts](#alerts) map.


**Kind:** inner method of [useZeroAlertStore](#usezeroalertstore)

| param | type | description |
| ----- | ---- | ----------- |
| `alertId` | string | The ID of the alert object to retrieve. |


 - **Returns:** `Object`

#### removeAlert()


Removes an alert mapping from the [alerts](#alerts) map.


**Kind:** inner method of [useZeroAlertStore](#usezeroalertstore)

| param | type | description |
| ----- | ---- | ----------- |
| `alertId` | string | The ID of the alert object to remove. |

#### updateAlertData()


Updates the `data` key of an alert object.


**Kind:** inner method of [useZeroAlertStore](#usezeroalertstore)

| param | type | description |
| ----- | ---- | ----------- |
| `alertId` | string | The ID of the alert object to update. |
| `payload` | any | Data to save to the `data` key of the alert object. |

#### openAlert()


Sets the status of an alert to 'open'.


**Kind:** inner method of [useZeroAlertStore](#usezeroalertstore)

| param | type | description |
| ----- | ---- | ----------- |
| `alertId` | string | The ID of the alert object to update. |
| `data`<span>(optional)</span> | any | Data to save to the `data` key of the alert object. |

#### closeAlert()


Sets the status of an alert to 'closed'. Sets the alert's `data` key to `null`.


**Kind:** inner method of [useZeroAlertStore](#usezeroalertstore)

| param | type | description |
| ----- | ---- | ----------- |
| `alertId` | string | The ID of the alert object to update. |
