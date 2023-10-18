<template>
  <div :class="['field field-input', state, { empty, disabled }]">

    <div v-if="disabled" class="input">
      {{ value }}
    </div>

    <div v-else class="input-container">
      <input
        :id="modelKey"
        :type="inputType"
        :name="modelKey"
        :placeholder="placeholder"
        :value="value"
        :min="min"
        :max="max"
        :autocomplete="autocomplete"
        class="input"
        @focus="emit('toggleFocused', true)"
        @blur="emit('toggleFocused', false)"
        @input="emit('updateValue', $event.target.value)" />
    </div>

  </div>
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

const emit = defineEmits(['updateValue', 'toggleFocused'])

// ======================================================================== Data
const scaffold = props.field.scaffold
const modelKey = props.field.modelKey
const inputType = scaffold.inputType || 'text'
const placeholder = scaffold.placeholder || 'Enter a value...'
const autocomplete = scaffold.autocomplete
const pre = scaffold.pre
const min = scaffold.min
const max = scaffold.max
const disabled = props.forceDisabled || scaffold.disabled

// ==================================================================== Computed
const value = computed(() => props.field.value)
const state = computed(() => props.field.state)
const empty = computed(() => !value.value || value.value === '')

// ======================================================================= Watch
watch(props.field, (field) => {
  const value = field.value
  if (typeof pre !== 'string') { return }
  const regex = new RegExp(pre)
  if (regex.test(value)) { // value contains restricted characters
    const stripped = value.replace(regex, '')
    emit('updateValue', stripped)
  }
})
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.input-container,
.input {
  width: 100%;
  height: 100%;
}

.input {
  appearance: none;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    margin: 0;
    appearance: none;
  }
}
</style>
