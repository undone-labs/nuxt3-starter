<template>
  <component
    :is="rootHtmlTag"
    v-if="displayField && field"
    :class="['field', state, { disabled }]">

    <slot
      :field="field"
      :field-id="id"
      :field-type="fieldType"
      :state="state"
      :required="required"
      :disabled="disabled"
      :validation-message="validationMessage"
      :update-value="updateValue"
      :toggle-state="toggleState" />

  </component>
</template>

<script setup>
// ===================================================================== Imports
import { storeToRefs } from 'pinia'
import Debounce from 'lodash/debounce'

// ======================================================================= Props
const props = defineProps({
  scaffold: {
    type: Object,
    required: true
  },
  forceDisabled: {
    type: Boolean,
    required: false,
    default: false
  },
  forceValidate: {
    type: Boolean,
    required: false,
    default: true
  },
  deregisterOnDestroy: {
    type: Boolean,
    required: false,
    default: false
  },
  /**
   * On occasions where the final root element in field-conditional.vue render
   * must be something specific. Such as when wrapping a <tbody> in a field-standalone,
   * it cannot be a div as the wrapper. It must be <tbody> at the root to prevent
   * SSR hydration errors.
   */
  rootHtmlTag: {
    type: String,
    required: false,
    default: 'div'
  }
})

// ================================================================ Setup & Data
const scaffold = props.scaffold
const formId = scaffold.formId
const modelKey = scaffold.modelKey
const required = scaffold.required
const react = scaffold.react
const conditions = scaffold.conditions
const disabled = props.forceDisabled || scaffold.disabled
const deregister = scaffold.deregisterOnDestroy || props.deregisterOnDestroy
const id = modelKey || scaffold.id || useUuid().v4()
let debounceSaveFieldToLsUponValueUpdate = null
const store = useZeroFormStore()

await store.setField(useRegisterField(
  id,
  formId,
  scaffold,
  props.forceValidate
))

const { fields } = storeToRefs(store)
const field = computed(() => fields.value[id])

const { $bus } = useNuxtApp()

// ==================================================================== Computed
const displayField = computed(() => field.value.displayField)
const state = computed(() => field.value.state)

const fieldType = computed(() => {
  const type = scaffold.type
  let component = false
  switch (type) {
    case 'input' : component = 'FieldInput'; break
    case 'textarea' : component = 'FieldTextarea'; break
    case 'range' : component = 'FieldRange'; break
    case 'checkbox' : component = 'FieldCheckbox'; break
    case 'radio' : component = 'FieldRadio'; break
    case 'select' : component = 'FieldSelect'; break
    case 'typeahead' : component = 'FieldTypeahead'; break
    case 'chiclet' : component = 'FieldChiclet'; break
    case 'wysiwyg' : component = 'FieldWysiwyg'; break
  }
  return component
})

const validationMessage = computed(() => {
  const validationMessage = scaffold.validationMessage
  const validation = field.value.validation
  if (!validationMessage || !validation) { return null }
  return validationMessage[validation]
})

// ======================================================================= Hooks
onMounted(async () => {
  await nextTick(async () => {
    const fieldToRestoreFromLsOrToDisplay = await getLocalStorageValue() || {
      id,
      mounted: displayField.value
    }
    await store.setField(fieldToRestoreFromLsOrToDisplay)
    $bus.$on('fieldValueUpdated', (field) => {
      detectConditions(field)
      initializeReactions(field)
    })
    detectConditions(fieldToRestoreFromLsOrToDisplay, 'mounted')
    debounceSaveFieldToLsUponValueUpdate = Debounce(() => {
      // useSaveFieldToLS(field.value)
    }, 500)
  })
})

onBeforeUnmount(() => {
  if (field.value && deregister) {
    store.setField({
      id,
      mounted: false
    })
  }
})

// ===================================================================== Methods
/**
 * @method toggleState
 */

const toggleState = async (focused) => {
  const update = { id }
  if (focused) {
    update.state = 'in-progress'
  } else {
    const check = useValidateField(field.value)
    update.state = check.state
    update.originalState = check.state
    update.validation = check.validation
    update.originalValidation = check.originalValidation
  }
  await store.setField(update)
  if (!focused) {
    // useSaveFieldToLS(field.value)
  }
}

/**
 * @method updateValue
 */

const updateValue = async (value) => {
  const updated = { id, value }
  await store.setField(updated)
  debounceSaveFieldToLsUponValueUpdate()
  $bus.$emit('fieldValueUpdated', updated)
}

/**
 * @method getLocalStorageValue
 */

const getLocalStorageValue = () => {
  const form = JSON.parse(useLs().get(`form__${formId}`))
  if (!form) { return undefined }
  const field = form[modelKey]
  if (!field) { return undefined }
  const check = useValidateField(field)
  field.state = check.state
  field.originalState = check.state
  field.validation = check.validation
  field.originalValidation = check.originalValidation
  return field
}

/**
 * @method initializeReactions
 */

const initializeReactions = async (updatedField) => {
  if (!react) { return }
  const len = react.length
  for (let i = 0; i < len; i++) {
    const reaction = react[i]
    if (reaction.modelKey === updatedField.id) {
      const updated = {
        id,
        value: this[reaction.func](...Object.values(reaction.args))
      }
      const check = useValidateField(field.value)
      updated.state = check.state
      updated.validation = check.validation
      await store.setField(updated)
      // useSaveFieldToLS(field.value)
    }
  }
}

/**
 * @method detectConditions
 */

const detectConditions = async (updatedField, loadState) => {
  if (!conditions && (updatedField.id === id || loadState !== 'mounted')) { return }
  const dualValueFields = ['select', 'radio', 'checkbox']
  const len = conditions.length
  let toggleDisplayField = [true]
  for (let i = 0; i < len; i++) {
    const condition = conditions[i]
    const eq = `${condition.eq}`
    const neq = `${condition.neq}`
    const field = await useField().get(condition.modelKey)
    if (field) {
      const type = field.scaffold.type
      let value = `${field.value}`
      if (dualValueFields.includes(type)) {
        value = `${value[0]}`
      }
      const valueIsNullState = useFieldValueIsNullState(field)
      if (valueIsNullState) {
        toggleDisplayField.push(false)
      } else if (eq !== 'undefined') {
        toggleDisplayField.push(value === eq)
      } else if (neq !== 'undefined') {
        toggleDisplayField.push(value !== neq)
      }
    }
  }
  toggleDisplayField = toggleDisplayField.every(val => val === true)
  if (displayField.value !== toggleDisplayField) {
    const updated = {
      id,
      validate: toggleDisplayField,
      displayField: toggleDisplayField,
      mounted: toggleDisplayField
    }
    await store.setField(updated)
    if (loadState !== 'mounted') {
      // useSaveFieldToLS(field.value)
    }
  }
}
</script>
