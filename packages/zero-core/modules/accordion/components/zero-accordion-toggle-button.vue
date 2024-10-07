<template>
  <ZeroButton
    class="toggle-accordion-button"
    :loader="id"
    @clicked="toggleAllAccordionSections(accordionId)">
    <!--
      @slot Button content
        @binding all-sections-open Binds the [allSectionsOpen](/zero-core/modules/accordion/components#allsectionsopen) computed prop to the slot.
    -->
    <slot :all-sections-open="allSectionsOpen" />

  </ZeroButton>
</template>

<script setup>
/**
 * @description An instance of the [zeroButton](/zero-core/modules/button/components) that expands and collapses all accordion sections of its associated accordion at once.
 */
// ===================================================================== Imports
import { storeToRefs } from 'pinia'

// ======================================================================= Props
const props = defineProps({
  /**
   * The ID of the target accordion for this component.
   */
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
/**
 * @method accordion
 * @computed
 * @desc Returns the accordion associated with this component from the [accordions](/zero-core/modules/accordion/store#accordions) array in the accordion store.
 * @returns {Object}
 */
const accordion = computed(() => accordions.value[props.accordionId])

/**
 * @method allSectionsOpen
 * @computed
 * @desc A boolean indicating if all the sections belonging to this component's accordion are open or not. True if all are open, false if otherwise.
 * @returns {boolean}
 */
const allSectionsOpen = computed(() => accordion.value ? accordion.value.allSectionsOpen : false)

// ===================================================================== Methods
/**
 * @method toggleAllAccordionSections
 * @desc Called when the button is clicked. This method subsequently calls the [toggleAllSections](/zero-core/modules/accordion/store#toggleallsections) method from the accordion store. Sets the [zeroButton](/zero-core/modules/button/components) component instance to loading: `false`.
 */
const toggleAllAccordionSections = (accordionId) => {
  accordionStore.toggleAllSections(accordionId)
  buttonStore.setButton({ id, loading: false })
}
</script>
