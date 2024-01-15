<template>
  <main class="page">

    <h1 class="page-heading">
      Alert
    </h1>

    <div class="demo-form">

      <div class="form-title">
        {{ form.title }}
        <ZeroAlert
          v-slot="{ accepted, rejected }"
          :alert-id="alertId">

          <span class="alert-text" v-html="alert.text" />

          <ZeroButton
            loader="accept-alert"
            class="accept-alert"
            @clicked="submitForm(alertId, accepted)">
            {{ alert.buttons.accept }}
          </ZeroButton>

          <ZeroButton
            class="reject-alert"
            @clicked="rejected">
            {{ alert.buttons.reject }}
          </ZeroButton>

        </ZeroAlert>
      </div>

      <div class="form-body">
        <FormFieldContainer :scaffold="scaffold.ecosystem_associates_radio" />

        <ZeroButton
          class="submit-button"
          :disabled="formSubmitted"
          @clicked="submitForm(alertId)">
          {{ formSubmitted ? 'Submitted!' : 'Submit Form' }}
        </ZeroButton>
      </div>

    </div>

  </main>
</template>

<script setup>
// ======================================================================= Setup
const alertStore = useZeroAlertStore()

// ======================================================================== Data
const { data: content } = await useAsyncData('alert-content', () => {
  return queryContent({
    where: {
      _path: { $contains: '/zero-ui/alert' }
    }
  }).find()
})
const form = content.value[0].demo_form
const scaffold = form.scaffold
const alertId = unslugify(form.title, 'pascal-case', ' ')
const alert = form.alert
const formSubmitted = ref(false)

// ===================================================================== Methods
/**
 * @method submitForm
 */
const submitForm = (alertId, accepted) => {
  const alertStatus = alertStore.getAlertStatus(alertId)
  if (!alertStatus.isOpen) { alertStore.openAlert(alertId); return }
  if (alertStatus.isOpen) {
    accepted()
    // api call to submit form would go here
    formSubmitted.value = true
    console.log('Form submitted!')
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.demo-form {
  padding-bottom: 1rem;
  border-radius: toRem(4);
  border: 1px solid $alto;
}

.button {
  padding: toRem(5) toRem(10);
  border-radius: toRem(4);
  border: 1px solid $alto;
  &:hover,
  &:focus-visible {
    background-color: $melrose;
  }
}

// //////////////////////////////////////////////////////////////////////// Form
.form-title {
  position: relative;
  padding: 1rem 2rem;
  border-bottom: 1px solid $alto;
  overflow: hidden;
}

.form-body {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem 2rem;
}

.submit-button.disabled:hover {
  background-color: transparent;
}

// /////////////////////////////////////////////////////////////////////// Alert
.alert {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: $wildSand;
  &.open {
    border: 2px solid $melrose;
  }
  > :not(:last-child) {
    margin-right: toRem(15);
  }
}

.alert-text {
  flex: 1;
  @include p2;
}

.reject-alert {
  padding: 0 toRem(10);
  &:hover {
    background-color: $alto;
  }
}

.accept-alert,
.reject-alert {
  height: fit-content;
  border-radius: toRem(20);
}
</style>
