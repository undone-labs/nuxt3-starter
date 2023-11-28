<template>
  <main class="page">

    <h1 class="h3">
      Curved sections and borders PoC
    </h1>

    <section class="poc">
      <div class="grid">

        <div ref="container" class="col-4">
          <ClipPath
            v-if="container"
            :mirror-dimensions="() => container"
            anchor-type="corner"
            :anchor-position="4"
            :border-radius="8">

            <template #svg-path>
              <TestSvg />
            </template>

            <template #clipped-content>
              <div class="image-wrapper">
                <img src="/bubbles-resize.jpeg" />
              </div>
            </template>

          </ClipPath>
        </div>

        <div class="col-4">
          <div class="text-1">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.            </div>
          </div>
        </div>

      </div>
    </section>

  </main>
</template>

<script setup>
const container = ref(null)

</script>

<style lang="scss" scoped>
.poc {
  display: flex;
  justify-content: center;
  padding: 5rem 0;
}

.image-wrapper {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}

</style>