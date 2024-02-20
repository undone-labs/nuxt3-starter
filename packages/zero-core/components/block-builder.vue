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
// ======================================================================= Setup
defineProps({
  sections: {
    type: Array,
    required: true
  }
})

// ===================================================================== Methods
/**
 * @method notHidden
 */

const notHidden = sections => {
  return sections.filter(section => !section.hide)
}

/**
 * @method getGridClasses
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
 */

const getBlocks = section => {
  const blocks = section.blocks
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
