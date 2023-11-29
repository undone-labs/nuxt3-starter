<template>
  <main class="page">

    <h1 class="h3">
      Curved sections and borders PoC
    </h1>

    <section class="poc">
      <div class="grid">

        <div ref="container" class="col-4" data-push-left="off-2">
          <ClipPath
            v-if="container"
            :target-content-height="300"
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

        <div class="col-4" data-push-right="off-2">
          <div class="text-1">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="canvas-based-poc">

            <CanvasClipPath
              :display-guides="false"
              :breakpoints-x="[50, 550, 720, 1220]">
              <template #svg-path>
                <TestSvg2 />
              </template>
              <template #clipped-content>
                <div class="bubbles"></div>
              </template>
              <template #overlay-content>
                <div class="overlay">
                  <div class="text">
                    Lörem ipsum plaliga tähåskapet relig men proktig telererar reabel, pangar. Geopuras ultrar megabesk otånera vanylig utan nylöbel soplabel.
                  </div>
                </div>
              </template>
            </CanvasClipPath>

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

.background {
  position: absolute;
  &.inner {
    :deep(.clipped-content) {
      left: 0;
    }
  }
}

.relative,
.foreground {
  position: relative;
}

.text {
  padding: 5rem 3rem;
  color: white;
  font-weight: 500;
  font-size: toRem(20);
  min-height: toRem(400);
}

.canvas-based-poc {
  .overlay {
    position: relative;
    height: toRem(364);
    padding: 5rem 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      padding: 0;
      min-height: unset;
      text-align: center;
    }
  }
}

.bubbles {
  width: 100%;
  height: 100%;
  background-image: url('/bubbles-wide.jpg.webp');
  background-size: 1200px 801px;
  background-position: center;
}
</style>