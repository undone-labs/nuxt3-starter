<template>
  <div
    v-for="(column, i) in parseColumns(columns)"
    :key="i"
    :class="column.col"
    v-bind="column.attrs">

    <!-- ======================================================= Nested grid -->
    <ZeroBlockBuilderColumns
      v-if="column.isGrid"
      :columns="column.columns" />

    <!-- ===================================================== Render blocks -->
    <div v-else :class="['column-content', column.classes]">
      <component
        :is="block.is"
        v-for="(block, j) in column.blocks"
        :key="`column-${i}-${block.is}-${j}`"
        v-bind="stripIs(block)" />
    </div>

  </div>
</template>

<script setup>
/**
 * @description Generates the columns that make up a [Block Builder](/zero-core/components/block-builder) page section. Each column renders a list of child blocks. This component can call itself recursively, in which case the parent instance turns into the grid containing child columns.
 */
// ======================================================================= Setup
defineProps({
  /**
   * An array of columns to render within a parent section's grid. Each column object consists of the following optional properties:
   * @param {string} col See [Gridlex docs](https://gridlex.devlint.fr/) for how to format this value. If this value includes `grid`, the component will be triggered to recursively call itself.
   * @param {string} data-push-left See [Gridlex docs](https://gridlex.devlint.fr/) for how to format and how this will affect the column.
   * @param {string} data-push-right See [Gridlex docs](https://gridlex.devlint.fr/) for how to format and how this will affect the column.
   * @param {[Object]} columns When recursively calling itself, this array of column objects will be passed to the child [Block Builder Columns](/zero-core/components/block-builder-columns) component.
   * @param {[string]} classes An array of classes to add to the column's inner content wrapper.
   * @param {[Object]} blocks An array of block objects. The properties of each block object are bound to Vue's dynamic component, `<component />`. Each block object must include an `is` property that tells the dynamic component what component to render. The `is` key is deleted from the object before props are bound to the component instance.
   */
  columns: {
    type: Array,
    required: true
  }
})

// ======================================================================== Data
const allowedPushAttributes = ['data-push-left', 'data-push-right']

// ===================================================================== Methods
/**
 * @method parseColumns
 * @desc - Parses and formats the columns array to be used by the component render template.
 * @param {[Object]} columns An array of column objects.
 * @returns {[Object]}
 */

const parseColumns = columns => {
  const compiled = []
  columns.forEach(entry => {
    compiled.push({
      col: entry.col,
      isGrid: entry.col.includes('grid'),
      classes: getColumnClasses(entry),
      attrs: getColumnPushAttributes(entry),
      blocks: getBlocks(entry),
      columns: entry.columns
    })
  })
  return compiled
}

/**
 * @method getColumnPushAttributes
 * @desc - Searches a column for the presence of one or both `data-push-left` and/or `data-push-right` attributes and returns an object with just these two attributes to bind to the column element.
 * @param {Object} column The column object to parse.
 * @returns {Object}
 */

const getColumnPushAttributes = column => {
  const attrs = {}
  Object.keys(column).map(key => {
    if (allowedPushAttributes.includes(key)) {
      attrs[key] = column[key]
    }
  })
  return attrs
}

/**
 * @method getColumnClasses
 * @desc - Joins the classes in the column's classes array into a single string to add to the class list of the inner `.column-content` div.
 * @param {Object} column The column object to parse.
 * @returns {string}
 */

const getColumnClasses = column => {
  const classes = column.classes
  return classes && Array.isArray(classes) ? classes.join('') : ''
}

/**
 * @method getBlocks
 * @desc - Tests if there are blocks to render outside the grid columns.
 * @param {[Object]} section The section to test for the existence of a blocks array.
 * @returns {[Object]|boolean}
 */

const getBlocks = column => {
  const blocks = column.blocks
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
