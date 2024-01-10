// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroAccordionStore = defineStore('zero-accordion', () => {
  // ===================================================================== state
  const accordions = ref({})
   /**
   * Expected accordion structure:
   * {
   *  sections: []
   * }
   */
  // =================================================================== actions

  /**
   * @method setAccordion
   */
  const setAccordion = (payload) => {
    accordions.value[payload.accordionId] = payload
  }

  /**
   * @method removeAccordion
  */
 const removeAccordion = (accordionId) => {
   delete accordions.value[accordionId]
  }

  /**
   * @method setAccordionSection
   */
  const setAccordionSection = (accordionId, sectionId) => {
    if (accordions.value[accordionId].children.includes(sectionId)) { return }
    accordions.value[accordionId].children.push(sectionId)
  }

  /**
   * @method toggleAccordionSection
   */
  const toggleAccordionSection = (accordionId, sectionId) => {
    const active = accordions.value[accordionId].active
    if(!accordions.value[accordionId].multiple) {
      if(active === sectionId) {
        accordions.value[accordionId].active = false
      } else {
        accordions.value[accordionId].active = sectionId
      }
    } else {
      const index = active.indexOf(sectionId)
      if(index === -1) {
        accordions.value[accordionId].active.push(sectionId)
      } else {
        accordions.value[accordionId].active = accordions.value[accordionId].active.toSpliced(index, 1)
      }
    }
    if (active.length === accordions.value[accordionId].children.length) {
      accordions.value[accordionId].allSectionsOpen = true
    }
  }

  /**
   * @method toggleAllSections
   */
  const toggleAllSections = (accordionId) => {
    if(!accordions.value[accordionId].multiple) {
      return
    }
    const children = accordions.value[accordionId].children
    if (accordions.value[accordionId].active.length < children.length) {
      accordions.value[accordionId].active = [...children]
      accordions.value[accordionId].allSectionsOpen = true
    } else {
      accordions.value[accordionId].active = []
      accordions.value[accordionId].allSectionsOpen = false
    }
  }

  // ==================================================================== return
  return {
    // ----- state
    accordions,
    // ----- actions
    setAccordion,
    removeAccordion,
    setAccordionSection,
    toggleAccordionSection,
    toggleAllSections
  }
})
