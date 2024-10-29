<template>
  <div class="page error">

    <SiteHeader />

    <div class="grid">
      <div class="col-6">
        <div class="page-content">

          <h1 class="heading">
            {{ statusCode }}
          </h1>

          <div class="message">
            {{ message }}
          </div>

          <pre v-if="stack && stack !== ''"><code>{{ stack }}</code></pre>

          <ButtonClear
            class="button-home"
            tag="nuxt-link"
            to="/">
            Back to Home
          </ButtonClear>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
// ======================================================================== Data
defineProps({
  statusCode: {
    type: Number,
    required: false,
    default: 404
  },
  message: {
    type: String,
    required: false,
    default: 'Looks like the page you\'re looking for doesn\'t exist'
  },
  stack: {
    type: String,
    required: false,
    default: ''
  },
  data: {
    type: Object,
    required: false,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.heading {
  @include h1;
  font-size: toRem(100);
  line-height: 1;
  margin-bottom: 2rem;;
}

.message {
  @include h3;
  transition: color 500ms;
}
</style>
