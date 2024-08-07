<template>
  <div
    ref="dropdown"
    :class="['dropdown-panel', `toggle-on-${toggleOn}`]">

    <slot
      name="toggle-button"
      :toggle-panel="togglePanel"
      :panel-open="panelOpen"
      :close-panel="closePanel"
      :selected="selected">
    </slot>

    <div :class="['panel-container', { open: panelOpen }]">

      <div class="panel">
        <slot
          name="dropdown-panel"
          :close-panel="closePanel"
          :set-selected="setSelected"
          :is-selected="isSelected">
        </slot>
      </div>

    </div>

  </div>
</template>

<script setup>
// ===================================================================== Imports
import { onClickOutside } from '@vueuse/core'

// ======================================================================= Props
const props = defineProps({
  toggleOn: {
    type: String,
    required: false,
    default: 'click'
  },
  displaySelected: {
    type: Boolean,
    required: false,
    default: false
  },
  defaultOption: {
    type: [String, Object],
    required: false,
    default: ''
  }
})

const emit = defineEmits(['dropdownPanelToggled', 'optionSelected'])

// ======================================================================== Data
const panelOpen = ref(false)
const selected = ref(props.defaultOption)
const dropdown = ref(null)

onClickOutside(dropdown, () => { closePanel() })

// ==================================================================== Watchers
watch(panelOpen, (state) => { emit('dropdownPanelToggled', state) })

watch(selected, (val) => { emit('optionSelected', val) })

// ===================================================================== Methods
/**
 * @method togglePanel
 */

const togglePanel = () => {
  if (props.toggleOn === 'click') {
    panelOpen.value = !panelOpen.value
  }
}

/**
 * @method closePanel
 */

const closePanel = () => {
  if (props.toggleOn === 'click' && panelOpen.value) {
    panelOpen.value = false
  }
}

/**
 * @method setSelected
 */

const setSelected = value => {
  if (props.displaySelected) {
    selected.value = value
  }
  closePanel()
}

/**
 * @method isSelected
 */

const isSelected = value => {
  if (typeof value === 'string') {
    return value === selected.value
  } else if (typeof value === 'object') {
    return JSON.stringify(value) === JSON.stringify(selected.value)
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.dropdown-panel {
  position: relative;
  &.toggle-on-hover {
    &:hover {
      .panel-container {
        transition: 150ms ease-in;
        transform: translate(-50%, 0);
        opacity: 1;
        visibility: visible;
        pointer-events: all;
      }
    }
  }
}

// /////////////////////////////////////////////////////////////////////// Panel
/**
 * .panel-container top offset ('padding-top' or 'top') and .panel width and/or
 * max-height must be set in the parent component as these are custom properties
 * that will differ panel-to-panel
 */

.panel-container {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  transition: 150ms ease-in;
  &:not(.open) {
    transition: 150ms ease-out;
    transform: translate(-50%, 1rem);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
}
</style>
