<template>
  <div class="breadcrumbs">

    <template v-for="(link, i) in links" :key="link.text">

      <component
        :is="link.hasOwnProperty('to') ? 'a' : 'span'"
        :href="link.to"
        :class="['breadcrumb', { link: link.hasOwnProperty('to') }]">
        {{ link.text }}
      </component>

      <span
        v-if="i !== links.length - 1"
        class="divider">
        /
      </span>

    </template>

  </div>
</template>

<script setup>
// ====================================================================== Import
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { useChangeCase } from '@vueuse/integrations/useChangeCase'
import BreadcrumbsData from '../data/breadcrumbs.json'

// ======================================================================== Data
const route = useRoute()

// ==================================================================== Computed
const path = computed(() => route.path.split('.')[0])
const mapping = computed(() => BreadcrumbsData.mapping)
const links = computed(() => {
  const out = [{ text: 'Docs', to: '/' }]
  const dirs = path.value.split('/').filter(item => item)
  const len = dirs.length
  for (let i = 0; i < len; i++) {
    const partial = dirs.slice(0, i + 1).join('/')
    const mapped = mapping.value[partial]
    out.push({
      text: useChangeCase(dirs[i], 'capitalCase').value,
      ...(mapped && mapped !== path.value && { to: mapped })
    })
  }
  return out
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  margin-bottom: 3.75rem;
}

.breadcrumb,
.divider {
  font-size: 0.875rem;
}

.breadcrumb {
  display: inline-block;
  font-weight: 500;
  &.link {
    position: relative;
    color: var(--link-color);
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      border-bottom: solid 1px var(--link-color);
      opacity: 0;
      transition: 150ms ease;
    }
    &:hover {
      &:after {
        opacity: 1;
      }
    }
  }
}

.divider {
  margin: 0 0.25rem;
}
</style>
