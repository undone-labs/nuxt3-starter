# zeroOpenPopup


A composable to create a new open window that navigates to a provided URL.

## Methods


 - [zeroOpenPopup()](#zeroopenpopup)

## All Members 

#### zeroOpenPopup()


Opens a popup window.


**Kind:** inner method of [zeroOpenPopup](#zeroopenpopup)

| param | type | description |
| ----- | ---- | ----------- |
| `id` | string | An ID for the call to the window `postMessage` method. Adds an interval to check if the popup is closed every 100ms. If the window is closed a message is posted to the original window with the popup ID and action. |
| `string` | action |  |
| `url` | string | The URL the new window should navigate to. |
| `title` | string | A title for the new window. |
| `w` | number | The width of the popup window. |
| `h` | number | The height of the popup window. |
