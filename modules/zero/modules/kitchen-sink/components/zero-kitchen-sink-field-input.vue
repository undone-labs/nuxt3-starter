<template>
  <ZeroFieldInput v-bind="{...props, ...$attrs}" />
</template>

<script setup>
// ======================================================================= Setup
const props = defineProps({
  field: {
    type: Object,
    required: true
  },
  forceDisabled: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<style lang="scss" scoped>
$height: 3.125rem;

// ///////////////////////////////////////////////////////////////////// General
.field-input {
  height: $height;
  &.in-progress {
    :deep(.input) {
      border-color: darkorange;
    }
  }
  &.error {
    :deep(.input) {
      border-color: red;
    }
  }
  &.disabled {
    cursor: no-drop;
    :deep(.input) {
      border-color: rgba(246, 245, 255, 0.25);
    }
  }
}

:deep(.input) {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 toRem(12);
  border: 2px solid teal;
  border-radius: toRem(5);
  transition: 150ms ease-in-out;
  @include placeholder {
    color: rgba(black, 0.7);
    font-style: italic;
    opacity: 1;
    transition: 150ms ease-out;
  }
}
</style>
