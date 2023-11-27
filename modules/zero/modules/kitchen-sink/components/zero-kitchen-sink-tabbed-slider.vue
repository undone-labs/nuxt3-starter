<template>
  <ZeroTabbedSlider :slides="slides">

    <template #tabs="{ isSelected, changeTab, tabs }">
      <div class="tabs">
        <ZeroButton
          v-for="tab in tabs"
          :key="`tab__${tab.slug}`"
          :loader="`tab-${tab.slug}`"
          :disabled="tab.disabled || undefined"
          :class="['tab', { active: isSelected(tab.slug) }]"
          @clicked="changeTab(tab.slug)">
          {{ tab.title }}
        </ZeroButton>
      </div>
    </template>

    <template
      v-for="slide in slides"
      :key="slide.slug"
      #[slide.slug]="{ isSelected }">
      <div
        v-if="isSelected(slide.slug)"
        :class="['slide', slide.slug, { active: isSelected(slide.slug) }]">
        <h3 v-html="slide.content.title" />
        <p v-html="slide.content.text" />
      </div>
    </template>

  </ZeroTabbedSlider>
</template>
<script setup>
// ======================================================================= Props
const props = defineProps({
  slides: {
    type: Array,
    required: true
  }
})

</script>
<style lang="scss" scoped>
.tabbed-slider {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tabs {
  display: flex;
  margin: 0 toRem(6);
}

.tab {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: toRem(2) toRem(12);
  padding-top: toRem(6);
  font-weight: 500;
  background-color: $melrose;
  border: 2px solid $blueRibbon;
  border-bottom: none;
  border-radius: toRem(5) toRem(5) 0 0;
  transition: 150ms ease-out;
  &:not(:last-child) {
    margin-right: toRem(3);
  }
  &:not(.active) {
    border-width: 1.5px;
    border-color: rgba($blueRibbon, 0.7);
    background-color: rgba($melrose, 0.4);
    &:not(.disabled):hover {
      transition: 150ms ease-in;
      opacity: 1;
    }
    &.disabled {
      cursor: no-drop;
      opacity: 0.6;
    }
  }
}

:deep(.window) {
  flex: 1;
  padding: toRem(12);
  border: 2px solid $blueRibbon;
  border-radius: toRem(4);
  overflow-y: scroll;
}

.slide {
  height: 100%;
}
</style>
