<template>
  <component
    :is="component"
    :id="id"
    :to="tag === 'nuxt-link' ? to : undefined"
    :href="tag === 'a' ? to : undefined"
    :disabled="disabled || loading"
    :target="target"
    :class="['button', { selected }, { disabled }]"
    @click="clickHandler($event)">
    <!--
      @slot The button content.
        @binding loading Binds the loading state returned by the [loading](/zero-core/modules/button/components#loading) computed prop.
    -->
    <slot :loading="loading" />

  </component>
</template>

<script setup>
/**
 * @description A feature-rich button component. It can be used as an internal or external link, as a regular button or as a button with loading states.
 * If an ID is provided via the `id` prop, the button will be registered in the [zeroButtonStore](/zero-core/modules/button/store) with a tracking object that makes loading states available.
 */
// ======================================================================= setup
const props = defineProps({
  /**
   * Defines the type of component this button will use. Use `nuxt-link` to create an internal link, `a` for an external link and `button` for a regular button element. Alternatively, any valid html element tag can be provided.
   * @values nuxt-link, a, button, etc.
   */
  tag: {
    type: String,
    required: false,
    default: 'button'
  },
  /**
   * If the button is intended to be used as either an internal or external link, this is the URL which it should navigate to.
   */
  to: {
    type: [String, Object],
    required: false,
    default: undefined
  },
  /**
   * The target attribute to add to the native anchor tag element. Mostly used for opening external links in new tabs with the target set to `_blank`.
   */
  target: {
    type: [String, Object],
    required: false,
    default: undefined
  },
  /**
   * A unique ID for this button. Only required if using the button with loading state functionality.
   */
  id: {
    type: [String, Object],
    required: false,
    default: undefined
  },
  /**
   * A boolean indicating if this button should be forced to be disabled. Otherwise the disabled state is automatically set to true when the button is loading; see the [loading](/zero-core/modules/button/components#loading) computed prop below.
   */
  forceDisabled: {
    type: Boolean,
    required: false,
    default: false
  },
  /**
   * A boolean offering the ability to force a button's loading state. Will override the automatic loading state handling.
   */
  forceLoading: {
    type: Boolean,
    required: false,
    default: false
  },
  /**
   * A boolean indicating if this button is set to a 'selected' state. This only toggles a `selected` class in the button's classlist which can be styled from components above using `:deep(.button)`.
   */
  selected: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits([
  /**
   * Emits the click event received by the [clickHandler](/zero-core/modules/button/components#clickhandler) on click.
   */
  'clicked'
])

const buttonStore = useZeroButtonStore()

if (props.id) {
  buttonStore.setButton({ id: props.id, loading: false })
}

// ======================================================================== data
const { buttons } = storeToRefs(buttonStore)

const { $bus } = useNuxtApp()

// ==================================================================== computed
/**
 * @method button
 * @computed
 * @desc Returns this button's tracking object from the [button store](/zero-core/modules/button/store#buttons).
 * @returns {Object}
 */
const button = computed(() => buttons.value[props.id])

/**
 * @method loading
 * @computed
 * @desc Returns the loading state from the button tracking object above. Is overriden by the boolean value of the `forceLoading` prop.
 * @returns {boolean}
 */
const loading = computed(() => props.forceLoading || button.value?.loading)

/**
 * @method disabled
 * @computed
 * @desc Returns a boolean indicating if this button is disabled or not. Returns `true` if the button loading value is true as per above or if the `forceDisabled` prop is set to true.
 * @returns {boolean}
 */
const disabled = computed(() => props.forceDisabled || loading.value)

/**
 * @method component
 * @computed
 * @desc The component name to be passed to the `:is` prop of the Nuxt [dynamic component](https://nuxt.com/docs/guide/directory-structure/components#dynamic-components) instance. If the button is disabled, the `button` tag is returned.
 * @returns {string}
 */
const component = computed(() => {
  const tag = props.tag
  if (disabled.value) { return 'button' }
  if (tag !== 'nuxt-link') { return tag }
  return resolveComponent('NuxtLink')
})

// ===================================================================== methods
/**
 * @method clickHandler
 * @desc Emits a 'clicked' event. If the button has an ID, the id will be used to set the loading state in the button store using [setButton](/zero-core/modules/button/store#setbutton).
 * @param {Object} e A [click](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) event.
 */
const clickHandler = async e => {
  e.stopPropagation()
  if (!disabled.value && !props.selected) {
    if (typeof props.id === 'string') {
      await buttonStore.setButton({ id: props.id, loading: true })
    }
    emit('clicked', e)
  }
}

/**
 * @method handleSessionExpired
 * @desc If this button is loading, sets its loading state to `false` with [setButton](/zero-core/modules/button/store#setbutton). Before the button component is mounted, this method is registered with the Zero Core [$bus](/zero-core/plugins#bus) plugin listening for a `session-expired` event. It can be used for example, to set button loading states to false if a websocket disconnects.
 */
const handleSessionExpired = () => {
  if (loading.value) {
    buttonStore.setButton({ id: props.id, loading: false })
  }
}

// ======================================================================= hooks
$bus.$on('session-expired', handleSessionExpired)

onBeforeUnmount(() => {
  $bus.$off('session-expired', handleSessionExpired)
})
</script>
