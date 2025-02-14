
# Zero Alert


This module uses the 'Alert' nomenclature in reference to the pop-up or modal-like nature of its component. It is a combination of a wrapper component (documented here) that renders its contents visible as a modal and a [store](/zero-core/modules/alert/store) which tracks the existence and states of all modals. Before the component mounts, it will register a tracking object with its own ID and closed state in the Alert store.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `alertId` | string | An identifier for this Alert. Should be unique across all instances. |  |

## Computed properties

#### alert()


Returns the alert object associated with this component instance from the [Alert store](/zero-core/modules/alert/store#alerts).


 - **returns:** `Object`  

#### open()


Test indicating if this alert is currently open.


 - **returns:** `boolean`  

#### data()


Returns data associated with this alert.


 - **returns:** `any`  

## Slots

#### Default


**name:** `default`  **scoped:** `true`


The Alert contents to render as a modal.

| binding | type | description |
| ------- | ---- | ----------- |
| `close-alert` | `func` | The component's [closeAlert](/zero-core/modules/alert/components#closealert) method. |
| `data` | `any` | The alert data associated with this component and stored in the [Alert store](/zero-core/modules/alert/store). |

## Emitters


 - **completed** - undefined

## Methods

#### closeAlert()


Closes this alert by calling the Alert Store [closeAlert](/zero-core/modules/alert/store#closealert) method.
