<template>
  <ZeroButton
    class="toggle-accordion-button"
    :loader="id"
    @clicked="toggleAllAccordionSections(accordionId)">

    <slot :all-sections-open="allSectionsOpen" />

  </ZeroButton>
</template>

<script setup>
// ===================================================================== Imports
import { storeToRefs } from 'pinia'

// ======================================================================= Props
const props = defineProps({
  accordionId: {
    type: String,
    required: true
  }
})

// ======================================================================= Setup
const accordionStore = useZeroAccordionStore()
const buttonStore = useZeroButtonStore()
const id = `${props.accordionId}Toggle`
// ======================================================================== Data
const { accordions } = storeToRefs(accordionStore)

// ==================================================================== Computed
const accordion = computed(() => accordions.value[props.accordionId])
const allSectionsOpen = computed(() => accordion.value ? accordion.value.allSectionsOpen : false)

// ===================================================================== Methods
/**
 * @method toggleAllAccordionSections
 */
 const toggleAllAccordionSections = (accordionId) => {
  accordionStore.toggleAllSections(accordionId)
  buttonStore.setButton({ id, loading: false })
}

</script>
