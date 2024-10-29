/**
 * @module useZeroAccordionStore
 * @desc A store for tracking [accordion](/zero-core/modules/accordion/components#zero-accordion) instances and their expanded/collapsed [section](/zero-core/modules/accordion/components#zero-accordion-section) states.
 */
// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroAccordionStore = defineStore('zero-accordion', () => {
  // ===================================================================== state
  /**
   * @member {Object} accordions
   * @kind ref
   * @desc An object containing nested objects representing individual accordion instances. Each nested object exists at the root level of this object, has a key corresponding to its accordionId and should be of the following structure:
   * ```js
   * {
   *   accordionId: string,
   *   multiple: boolean,
   *   id: string,
   *   children: Array,
   *   active: Array|boolean,
   *   allSectionsOpen: boolean
   * }
   * ```
   */
  const accordions = ref({})

  // =================================================================== actions

  /**
   * @method setAccordion
   * @desc Adds an accordion instance tracking object to the [accordions object](/zero-core/modules/accordion/store#accordions) above.
   * @param {Object} payload The tracking object. Should have the structure defined in the [accordions object](/zero-core/modules/accordion/store#accordions) above.
   */
  const setAccordion = payload => {
    accordions.value[payload.accordionId] = payload
  }

  /**
   * @method removeAccordion
   * @desc Removes an accordion tracking object from the accordions state above.
   * @param {string} accordionId The ID of the accordion to remove.
   */
  const removeAccordion = accordionId => {
   delete accordions.value[accordionId]
  }

  /**
   * @method setAccordionSection
   * @desc Adds a section to be tracked to the accordion tracking object in the accordions state above. This method pushes the section ID to the `children` array in the tracking above.
   * @param {string} accordionId The ID of the accordion to add the section to.
   * @param {string} sectionId The ID of the section.
   */
  const setAccordionSection = (accordionId, sectionId) => {
    if (accordions.value[accordionId].children.includes(sectionId)) { return }
    accordions.value[accordionId].children.push(sectionId)
  }

  /**
   * @method toggleAccordionSection
   * @desc Toggles the expanded/collapsed state of an accordion section. If the toggle results in all sections of the accordion in question being set to expanded, the `allSectionsOpen` boolean in the accordion tracking object will be set to `true`. Otherwise, it is set to `false`.
   * @param {string} accordionId The ID of the accordion that the section belongs to.
   * @param {string} sectionId The ID of the section whose expanded or collapsed state should be toggled.
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
        accordions.value[accordionId].active = accordions.value[accordionId].active.filter((_, i) => i !== index)
      }
    }
    if (active.length === accordions.value[accordionId].children.length) {
      accordions.value[accordionId].allSectionsOpen = true
    }
  }

  /**
   * @method toggleAllSections
   * @desc Sets all sections belonging to an accordion to their expanded states.
   * @param {string} accordionId The ID of the accordion in question.
   */
  const toggleAllSections = accordionId => {
    if (!accordions.value[accordionId].multiple) {
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
