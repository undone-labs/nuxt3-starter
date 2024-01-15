<template>
  <main class="page">

    <h1 class="page-heading">
      Accordion
    </h1>

    <!--**
        * [Accordion] default: one section open at a time
        * -->
    <div class="accordion-title">
      Default Accordion: opens one section at a time
    </div>
    <ZeroAccordion
      :accordion-id="demoAccordionId">
      <ZeroAccordionSection
        v-for="(section, i) in demoAccordionSections"
        :key="`section-${i}`"
        :accordion-id="demoAccordionId">

        <template #header>
          {{ section.title }}
        </template>

        <template #content>
          <div class="accordion-content">
            {{ section.content }}
          </div>
        </template>

      </ZeroAccordionSection>
    </ZeroAccordion>

    <!--**
        * [Accordion] multiple sections openable at a time
        * -->
    <div class="accordion-title">
      Multiple Accordion: multiple sections openable

      <ZeroAccordionToggleButton
        v-slot="{ allSectionsOpen }"
        :accordion-id="demoAccordionMultipleId">
        {{ allSectionsOpen ? 'Close All' : 'Open All' }}
      </ZeroAccordionToggleButton>

    </div>
    <ZeroAccordion
      :accordion-id="demoAccordionMultipleId"
      :multiple="demoAccordionMultiple.multiple">
      <ZeroAccordionSection
        v-for="(section, i) in demoAccordionMultiple.sections"
        :key="`section-${i}`"
        :accordion-id="demoAccordionMultipleId">

        <template #header>
          {{ section.title }}
        </template>

        <template #content>
          <div class="accordion-content">
            {{ section.content }}
          </div>
        </template>

      </ZeroAccordionSection>
    </ZeroAccordion>

  </main>
</template>

<script setup>
// ======================================================================== Data
const { data: content } = await useAsyncData('content', () => {
  return queryContent({
    where: {
      _path: { $contains: '/zero-ui/accordion-sample' }
    }
  }).find()
})

const demoAccordionId = computed(() => content.value[0].demo_accordion.id)
const demoAccordionSections = computed(() => content.value[0].demo_accordion.sections)
const demoAccordionMultipleId = computed(() => content.value[0].demo_accordion_multiple.id)
const demoAccordionMultiple = computed(() => content.value[0].demo_accordion_multiple)
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.accordion-title {
  margin-bottom: 1rem;
}

// /////////////////////////////////////////////////////////////////// Accordion
$padding-y: 1rem;
$padding-x: 2rem;

.toggle-accordion-button {
  padding: toRem(3) toRem(10);
  border-radius: toRem(6);
  border: 1px solid $alto;
  &:hover {
    background-color: $mercury;
    border-color: $blueRibbon;
  }
}
.accordion {
  &:not(:last-child) {
    margin-bottom: 3rem;
  }
}
:deep(.accordion-section) {
  border-radius: toRem(6);
  border: 1px solid $alto;
  &:hover {
    border-color: $blueRibbon;
    .accordion-header {
      font-weight: 600;
    }
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}
:deep(.accordion-header) {
  padding: $padding-y $padding-x;
  cursor: pointer;
  &.open {
    font-weight: 600;
  }
}
.accordion-content {
  padding: 0 $padding-x $padding-y;
}
</style>
