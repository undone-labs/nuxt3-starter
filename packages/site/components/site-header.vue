<template>
  <header id="site-header">
    <div class="grid">
      <div class="col">

        <!-- ========================================================== Logo -->
        <ButtonClear
          v-bind="logoLink"
          class="logo-link">
          LOGO
          <!-- <Logo class="logo" /> -->
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
// ======================================================================== Data
const { data: navigation } = await useAsyncData('navigation', async () => {
  const content = await queryContent({
    where: {
      _file: { $contains: 'data/navigation.json' }
    }
  }).find()
  return content[0]
})

const logoLink = navigation.value.logoLink
const links = navigation.value.links
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
