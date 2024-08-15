# Button

The button module provides feature rich buttons which can be used as such or for internal and external routing.

<script setup>
import TestButton from '../../../.vitepress/theme/components/test-button.vue'
</script>

The following button is not the real Zero Button;

<TestButton />

### Methods

The methods of the Zero Button Component:

```js
/**
 * @method clickHandler
 */

const clickHandler = async e => {
  e.stopPropagation()
  if (!disabled.value) {
    if (typeof props.id === 'string') {
      await buttonStore.setButton({ id: props.id, loading: true })
    }
    emit('clicked', e)
  }
}

/**
 * @method handleSessionExpired
 */

const handleSessionExpired = () => {
  if (loading.value) {
    buttonStore.setButton({ id: props.id, loading: false })
  }
}
```
