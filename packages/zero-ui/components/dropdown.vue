<template>
  <div
    v-click-outside="closePanel"
    :class="['dropdown-panel', `toggle-on-${toggleOn}`]">

    <slot
      name="toggle-button"
      :toggle-panel="togglePanel"
      :panel-open="panelOpen"
      :close-panel="closePanel" />

    <div :class="['panel-container', { open: panelOpen }]">

      <div class="panel">
        <slot
          name="dropdown-panel"
          :close-panel="closePanel" />
      </div>

    </div>

  </div>
</template>

<script setup>
// ======================================================================= Setup
const props = defineProps({
  toggleOn: {
    type: String,
    required: false,
    default: 'click'
  }
})

const emit = defineEmits(['dropdownPanelToggled'])

// ======================================================================== Data
const panelOpen = ref(false)

// ==================================================================== Watchers
watch(panelOpen, state => {
  emit('dropdownPanelToggled', state)
})

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
  if (props.toggleOn === 'click') {
    panelOpen.value = false
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
 * .panel-container padding-top (offset) and .panel width and/or max-height must
 * be set in the parent component as these are custom properties that will differ
 * panel-to-panel
 */

.panel-container {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  transition: 150ms ease-out;
  &:not(.open) {
    transition: 150ms ease-in;
    transform: translate(-50%, 1rem);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
}
</style>
