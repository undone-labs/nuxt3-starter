<template>
  <main class="page">

    <h1 class="h3">
      Curved sections and borders PoC
    </h1>

    <section class="poc">
      <div class="grid">

        <div class="col-4">
          <ClipPath :path="path">

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
const path = ref('M0.5 8.91406C0.5 4.49579 4.08172 0.914063 8.5 0.914063L509.5 0.914063C513.918 0.914063 517.5 4.49578 517.5 8.91406V550.414C517.5 554.832 513.918 558.414 509.5 558.414H101.5C97.0817 558.414 93.5 554.832 93.5 550.414V375.426C93.5 343.666 81.874 313.006 60.8165 289.231L33.1835 258.033C12.126 234.258 0.5 203.597 0.5 171.838V8.91406Z')
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