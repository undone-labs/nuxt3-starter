<template>
  <main class="page">

    <h1 class="h3">
      Curved sections and borders PoC
    </h1>

    <section class="poc">
      <div class="grid">

        <div class="col-4">
          <ClipPath
            :target-width="500"
            :target-height="500"
            anchor-type="corner"
            :anchor-position="4"
            :border-radius="8">

            <template #svg-path>
              <TestSvg />
            </template>

            <template #background>
              <div class="image-wrapper">
                <img src="/bubbles-resize.jpeg" />
              </div>
            </template>

            <template #foreground>

            </template>

          </ClipPath>
        </div>

        <div class="col-4">
          <div class="text-1">
            <div class="content">
              {{ path }}
            </div>
          </div>
        </div>

      </div>
    </section>

  </main>
</template>

<script setup>
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