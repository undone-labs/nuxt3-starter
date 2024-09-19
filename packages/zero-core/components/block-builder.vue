<template>
  <div
    v-for="(section, i) in notHidden(sections)"
    :id="section.id"
    :key="`section-${i}`"
    class="section">

    <!-- ============================================================== Grid -->
    <div :class="getGridClasses(section.grid)">
      <ZeroBlockBuilderColumns :columns="section.columns" />
    </div>

    <!-- ========================================================== Off grid -->
    <template v-if="getBlocks(section)">
      <component
        :is="block.is"
        v-for="(block, j) in section.blocks"
        :key="`section-${i}-${block.is}-${j}`"
        v-bind="stripIs(block)" />
    </template>

  </div>
</template>

<script setup>
/**
 * @description A high level page-builder component that generates a series of page sections containing columns and blocks from a JSON content scaffold. Generates child columns for each section using the [Block Builder Columns](/zero-core/components/block-builder-columns) component.
 */
// ======================================================================= Setup
defineProps({
  /**
   * An array of page sections. Each section object can have the following properties:
   * @param {string} id The DOM element id of the section
   * @param {[string]} grid An array of strings to append to the section grid class (see [Gridlex docs](https://gridlex.devlint.fr/) for possible options).
   * @param {[Object]} columns An array of column objects passed as the `columns` prop to [Block Builder Columns](/zero-core/components/block-builder-columns).
   * @param {[Object]} blocks An array of block objects. The properties of each block object are bound to Vue's dynamic component, `<component />`. Each block object must include an `is` property that tells the dynamic component what component to render. The `is` key is deleted from the object before props are bound to the component instance. These components will render outside of a column and thus will be free from the grid positioning.
   * @param {boolean} hide If set to true will remove this section from the list of sections to render.
   */
  sections: {
    type: Array,
    required: true
  }
})

// ===================================================================== Methods
/**
 * @method notHidden
 * @desc - Filters hidden sections from the list of sections to render.
 * @param {[Object]} sections The array of sections passed to the Block Builder as a prop.
 * @returns {[Object]}
 */

const notHidden = sections => {
  return sections.filter(section => !section.hide)
}

/**
 * @method getGridClasses
 * @desc - Append gridlex classes to the grid. Returns a single string used by the Gridlex grid. See props above for more info.
 * @param {[string]} grid - The array of classes to append.
 * @returns {string}
 */

const getGridClasses = grid => {
  const classList = ['grid']
  if (Array.isArray(grid) && grid.length > 0) {
    grid.forEach(className => classList.push(`-${className}`))
  }
  return classList.join('')
}

/**
 * @method getBlocks
 * @desc - Tests if there are blocks to render outside the grid columns.
 * @param {[Object]} section The section to test for the existence of a blocks array.
 * @returns {[Object]|boolean}
 */

const getBlocks = section => {
  const blocks = section.blocks
  return Array.isArray(blocks) ? blocks : false
}

/**
 * @method stripIs
 * @desc - Removes the `is` property from the props objects which will be bound to dynamically rendered block components.
 * @param {Object} block The block object who's key-value pairs will be bound to the component instance as props.
 * @returns {Object}
 */

const stripIs = block => {
  block = Object.assign({}, block)
  delete block.is
  return block
}
</script>
