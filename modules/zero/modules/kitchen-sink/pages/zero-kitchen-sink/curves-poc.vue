<template>
  <main class="page">

    <h1 class="h3">
      Curved sections and borders PoC
    </h1>

    <section class="poc">

      <div class="grid-equalHeight">
        <div class="col-6" data-push-left="off-0">
          <div class="title">
            heading heading heading
          </div>
        </div>
        <div
          class="col-6"
          data-push-right="off-0">
          <div class="example-1">
            <ResponsiveClipPath
              :display-guides="false"
              :breakpoints-x="[130, 480]"
              :breakpoints-y="[30, 150, 400, 530]">
              <template #svg-path>
                <TestSvg1 />
              </template>
              <template #clipped-content>
                <div class="squidgie"></div>
              </template>
            </ResponsiveClipPath>
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="col-12">
          <div class="example-2">
            <ResponsiveClipPath
              :display-guides="false"
              :breakpoints-x="[50, 550, 720, 1220]"
              :breakpoints-y="[70, 290]">
              <template #svg-path>
                <TestSvg2 />
              </template>
              <template #clipped-content>
                <div class="bubbles"></div>
              </template>
              <template #overlay-content>
                <div class="content">
                  <div class="text">
                    Lörem ipsum plaliga tähåskapet relig men proktig telererar reabel, pangar. Geopuras ultrar megabesk otånera vanylig utan nylöbel soplabel.
                  </div>
                </div>
              </template>
            </ResponsiveClipPath>
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
  padding: 5rem 0;
}

.title {
  padding: 8rem 1rem;
  font-size: toRem(60);
  font-weight: 500;
}

.example-2 {
  margin-top: 3rem;
}

.content {
  padding: 5rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  color: white;
  font-weight: 600;
  font-size: toRem(20);
  text-align: center;
}

.bubbles {
  width: 100%;
  height: 100%;
  background-image: url('/bubbles-wide.jpg.webp');
  background-size: 1200px 801px;
  background-position: center;
}

.squidgie {
  width: 100%;
  height: 100%;
  background-image: url('/bubbles-1.jpeg');
  background-size: 600px;
  background-position: center;
}
</style>