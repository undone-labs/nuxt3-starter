<template>
  <header id="site-header">
    <div class="grid">
      <div class="col">

        <!-- ========================================================== Logo -->
        <ButtonClear
          v-bind="logoLink"
          class="logo-link">
          LOGO
        </ButtonClear>

        <!-- ========================================================= Links -->
        <nav class="links">
          <ButtonClear
            v-for="link in links"
            :key="link.text"
            v-bind="link"
            class="nav-link">
            {{ link.text }}
          </ButtonClear>
        </nav>

      </div>
    </div>
  </header>
</template>

<script setup>
// ====================================================================== import
import Navigation from '@/data/navigation.json'

// ======================================================================== data
const logoLink = Navigation.logoLink
const links = Navigation.links
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#site-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
