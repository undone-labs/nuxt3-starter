<template>
  <div class="accordion">

    <slot :active="active" />

  </div>
</template>

<script>
// <script setup>
// ===================================================================== Imports

// ======================================================================= Props
const props = defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  toggleOnLoad: {
    type: Boolean,
    required: false,
    default: false
  },
  toggleWhenAdded: {
    type: Boolean,
    required: false,
    default: false
  },
  scrollToWhenAdded: {
    type: Boolean,
    required: false,
    default: false
  }
})

// ======================================================================== Data
const active = ref(props.multiple ? [] : false)
const children = ref([])
const keydown = ref(false)

// ==================================================================== Computed
const toggleState = computed(() => {
  return {
    open: active.value.length,
    total: children.value.length
  }
})

// ======================================================================= Hooks
onBeforeMount(() => {
  this.$on('toggle', (id) => {
    if (props.multiple) {
      // Open multiple panels
      if (active.value.includes(id)) {
        active.value = active.value.filter(_id => _id !== id)
      } else {
        active.value.push(id)
      }
      this.$emit('toggleStateChanged', toggleState.value)
    } else {
      // Open single panel
      if (this.active === id) {
        this.active = false
      } else {
        this.active = id
      }
    }
  })
  this.$on('expand-all', this.expandAll)
})

onMounted(() => {
  keydown.value = this.handleKeyboardNavigation
  window.addEventListener('keydown', this.keydown)
})

onBeforeUnmount(() => {
  if (this.keydown) { window.removeEventListener('keydown', this.keydown) }
})

// ====================================================================== Export
export default {
  beforeUnmount () {
  },

  methods: {
    compileChildren (id) {
      this.children.push(id)
    },
    setSelected (id) {
      if (this.multiple) {
        this.active.push(id)
      } else {
        this.active = id
      }
    },
    expandAll (forceOpen) {
      if (this.multiple) {
        const active = this.active
        const children = this.children
        if (active.length === children.length && !forceOpen) {
          this.active = []
        } else {
          this.children.forEach((id) => {
            if (!active.includes(id)) {
              this.active.push(id)
            }
          })
        }
        this.$emit('toggleStateChanged', this.toggleState)
      }
    },
    handleKeyboardNavigation (e) {
      if (e.repeat) { return }
      const meta = e.metaKey || e.ctrlKey
      const f = e.keyCode === 70 || e.code === 70 || e.key === 'f'
      if (meta && f) {
        this.expandAll(true)
      }
    }
  }
}
</script>
