<template>
  <div class="accordion">

    <!-- @slot [zeroAccordionSections](/zero-core/modules/accordion/components#zero-accordion-section) should be added to this slot -->
    <slot />

  </div>
</template>

<script setup>
/**
 * @description A component with child sections that can be toggled to expand and collapse. This component is relatively simple, consisting of a slot for multiple [zeroAccordionSection](/zero-core/modules/accordion/components#zero-accordion-section) components.
 * In the `onBeforeMount` hook of this component, an instance tracking object is set in the accordion store using the store's [setAccordion](/zero-core/modules/accordion/store#setaccordion) method. When the component is mounted, if the `toggleOnLoad` and `multiple` props are set to true, the [toggleAllSections](/zero-core/modules/accordion/store#toggleallsections) method of the accordion store will be called for this accordion instance.
 */
// ======================================================================= Props
const props = defineProps({
  /**
   * A unique identifier for this accordion instance. This same prop is present in all children components and its value should match those of its children.
   */
  accordionId: {
    type: String,
    required: true
  },
  /**
   * A boolean indicating whether or not multiple accordion sections can be expanded at the same time. `true` if so, `false` indicates expanded section states are mutually exclusive.
   */
  multiple: {
    type: Boolean,
    required: false,
    default: false
  },
  /**
   * A boolean indicating whether or not all accordion sections should be expanded upon mounting the component. **If `multiple` is set to false, this setting has no effect.**
   */
  toggleOnLoad: {
    type: Boolean,
    required: false,
    default: false // can't be true if multiple is false
  }
})

// ======================================================================= Setup
const accordionStore = useZeroAccordionStore()

// ======================================================================== Data
const keydown = ref(false)

// ======================================================================= Hooks
onBeforeMount(() => {
  accordionStore.setAccordion({
    accordionId: props.accordionId,
    multiple: props.multiple,
    id: props.accordionId,
    children: [],
    active: props.multiple ? [] : false,
    allSectionsOpen: false
  })
})

onMounted(() => {
  if (props.multiple && props.toggleOnLoad) {
    accordionStore.toggleAllSections(props.accordionId)
  }
  keydown.value = handleKeyboardNavigation
  window.addEventListener('keydown', keydown.value)
})

onBeforeUnmount(() => {
  if (keydown.value) { window.removeEventListener('keydown', keydown.value) }
})

// ===================================================================== Methods
/**
 * @method handleKeyboardNavigation
 * @desc The keyboard event handler that is called on window `keydown` events. Used to navigate the accordion with the keyboard. It will call the accordion store's [toggleAllSections](/zero-core/modules/accordion/store#toggleallsections) method if the 'f' and meta keys are pressed.
 * @param {Object} e The [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) object.
 */
const handleKeyboardNavigation = (e) => {
  if (e.repeat) { return }
  const meta = e.metaKey || e.ctrlKey
  const f = e.keyCode === 70 || e.code === 70 || e.key === 'f'
  if (meta && f) {
    accordionStore.toggleAllSections(props.accordionId)
  }
}
</script>
