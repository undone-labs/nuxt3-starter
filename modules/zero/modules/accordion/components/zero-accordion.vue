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
  }
})

// ======================================================================= Setup
const accordionStore = useZeroAccordionStore()

// ======================================================================== Data
const localId = ref(useUuid().v4())
const keydown = ref(false)

// ==================================================================== Computed
const id = computed(() => `${props.accordionId}|${localId.value}`)

// ======================================================================= Hooks
onBeforeMount(() => {
  accordionStore.setAccordion({
    accordionId: props.accordionId,
    multiple: props.multiple,
    id: id.value,
    children: [],
    active: props.multiple ? [] : false,
    allSectionsOpen: false
  })
})

onMounted(() => {
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
    expandAll(true)
  }
}
</script>
