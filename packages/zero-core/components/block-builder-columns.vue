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
// ======================================================================= Setup
defineProps({
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
 */

const getColumnClasses = column => {
  const classes = column.classes
  return classes && Array.isArray(classes) ? classes.join('') : ''
}

/**
 * @method getBlocks
 */

const getBlocks = column => {
  const blocks = column.blocks
  return Array.isArray(blocks) ? blocks : false
}

/**
 * @method stripIs
 */

const stripIs = block => {
  block = Object.assign({}, block)
  delete block.is
  return block
}
</script>
