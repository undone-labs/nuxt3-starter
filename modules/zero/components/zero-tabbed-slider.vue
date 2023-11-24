<template>
  <div class="tabbed-slider">

    <slot :change-tab="changeTab" name="before-tabs" />

    <slot
      name="tabs"
      :tabs="slides"
      :is-selected="isSelected"
      :change-tab="changeTab" />

    <div class="window">
      <slot
        v-for="slide in slides"
        :key="slide.slug"
        :name="slide.slug"
        :is-selected="isSelected" />
    </div>

  </div>
</template>
<script setup>
// ======================================================================= Setup
const props = defineProps({
  sliderId: {
    type: String,
    required: false,
    default: ''
  },
  slides: {
    type: Array, // Array of slides
    required: true
  },
  emitEvent: {
    type: [String, Boolean], // String of emit event to listen for
    required: false,
    default: false
  },
  emitEventCallback: {
    type: [Function, Boolean], // Function to run when emit event is recieved
    required: false,
    default: false
  }
})

const emit = defineEmits(['slideChanged'])

const { $bus } = useNuxtApp()

// ======================================================================== Data
const selected = ref(props.slides[0].slug)
emit('slideChanged', selected.value)

// ======================================================================= Hooks
onMounted(() => {
  if (props.emitEvent && props.emitEventCallback) {
    $bus.$on(props.emitEvent, props.emitEventCallback)
  }
})

// ===================================================================== Methods
/**
 * @method isSelected
 */

const isSelected = slug => {
  return selected.value === slug
}
/**
 * @method changeTab
 */
const changeTab = slug => {
  selected.value = slug
  emit('slideChanged', selected.value)
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.window {
  overflow: hidden;
  transition: height 0ms ease-in;
}
</style>
