<template>
  <component
    :is="component"
    :to="tag === 'nuxt-link' ? to : undefined"
    :href="tag === 'a' ? to : undefined"
    :disabled="disabled || loading"
    :target="target"
    :class="['button', { selected }, { disabled }]"
    @click="clickHandler($event)">

    <slot :loading="loading" />

  </component>
</template>

<script setup>
// ======================================================================= Props
const props = defineProps({
  tag: { // 'button', 'a' or 'nuxt-link'
    type: String,
    required: false,
    default: 'button'
  },
  to: {
    type: [String, Object],
    required: false,
    default: undefined
  },
  target: {
    type: [String, Object],
    required: false,
    default: undefined
  },
  loader: {
    type: [String, Object],
    required: false,
    default: undefined
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  selected: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['clicked'])

// ======================================================================= Setup
const { $button } = useNuxtApp()
const id = props.loader || useUuid().v4()
const button = await $button(id).register()
const loading = button && button.loading

// ==================================================================== Computed
const component = computed(() => {
  const tag = props.tag
  if (tag !== 'nuxt-link') { return tag }
  return resolveComponent('NuxtLink')
})

// ===================================================================== Methods
const clickHandler = (e) => {
  e.stopPropagation()
  if (!props.disabled) {
    if (typeof props.loader === 'string') {
      $button(id).set({ loading: true })
    }
    emit('clicked', e)
  }
}
</script>
