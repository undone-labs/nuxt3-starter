<template>
  <div class="breadcrumbs">

    <template v-for="(link, i) in links" :key="link.text">

      <div class="breadcrumb">
        {{ link.text }}
      </div>

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

// ======================================================================== Data
const route = useRoute()

// ==================================================================== Computed
const path = computed(() => route.path.split('.')[0])
const links = computed(() => {
  const out = [{ text: 'Docs' }]
  const dirs = path.value.split('/').filter(item => item)
  const len = dirs.length
  for (let i = 0; i < len; i++) {
    out.push({ text: useChangeCase(dirs[i], 'capitalCase') })
  }
  return out
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  margin-bottom: 0.75rem;
}

.breadcrumb,
.divider {
  font-size: 0.875rem;
}

.breadcrumb {
  font-weight: 500;
}

.divider {
  margin: 0 0.25rem;
}
</style>
