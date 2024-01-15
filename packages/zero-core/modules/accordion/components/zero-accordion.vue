<template>
  <div class="accordion">

    <slot />

  </div>
</template>

<script setup>
// ======================================================================= Props
const props = defineProps({
  accordionId: {
    type: String,
    required: true
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false
  },
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
