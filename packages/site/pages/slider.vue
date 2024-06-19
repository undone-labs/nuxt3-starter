<template>
  <div class="page">
    <div class="grid">
      <div class="col">

        <div class="settings">
          <button
            class="toggle"
            @click="sliderMode = !sliderMode">
            {{ `mode: ${mode}` }}
          </button>
          <button
            v-if="mode === 'marquee'"
            class="toggle"
            @click="marqueeLeft = !marqueeLeft">
            {{ `marquee direction: ${direction}` }}
          </button>
        </div>

        <ZeroSlider
          :slides="slides"
          :display="5"
          :mode="mode"
          :period="mode === 'slider' ? 300 : 300 * slides.length"
          :marquee-direction="direction">

          <template #slide="{ index }">
            <div class="wrapper">
              <div class="card" :style="{ '--background-color': slides[index].color }">
                <div class="text">
                  {{ slides[index].text }}
                </div>
              </div>
            </div>
          </template>

          <template #controls="{ increment }">
            <div :class="['controls', { disabled: mode === 'marquee'}]">
              <button class="control" @click="increment(-1)">
                ← Left
              </button>
              <button class="control" @click="increment(1)">
                Right →
              </button>
            </div>
          </template>

        </ZeroSlider>

      </div>
    </div>
  </div>
</template>

<script setup>
const slides = [
  {
    color: '#824166',
    text: 'hi.'
  },
  {
    color: '#d083ab',
    text: ''
  },
  {
    color: '#035fd5',
    text: 'I'
  },
  {
    color: '#f66f79',
    text: 'am'
  },
  {
    color: '#197e45',
    text: 'a'
  },
  {
    color: '#e92f78',
    text: 'slider'
  },
  {
    color: '#ad96d5',
    text: 'that'
  },
  {
    color: '#37c0de',
    text: 'doubles'
  },
  {
    color: '#fc8e08',
    text: 'as'
  },
  {
    color: '#b6de43',
    text: 'a'
  },
  {
    color: '#e9aabd',
    text: 'marquee.'
  },
  {
    color: '#2061b3',
    text: ''
  }
]

const sliderMode = ref(true)
const marqueeLeft = ref(true)
const mode = computed(() => sliderMode.value ? 'slider' : 'marquee')
const direction = computed(() => marqueeLeft.value ? 'left' : 'right')
</script>

<style lang="scss" scoped>
.settings {
  margin-top: toRem(200);
  display: flex;
}

.toggle {
  margin-right: toRem(16);
  border-radius: toRem(6);
  border: 1px solid black;
  padding: toRem(8) toRem(16);
  background-color: rgba(0, 0, 0, 0);
  transition: 200ms ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.wrapper {
  padding: toRem(16);
}

.card {
  --background-color: transparent;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: toRem(160);
  height: toRem(160);
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
    border-radius: toRem(10);
    opacity: 0.7;
  }
  .text {
    position: relative;
    font-size: toRem(24);
    font-weight: 500;
  }
}

.control {
  margin: 0 toRem(16);
  transition: 200ms ease;
  &:hover {
    transform: scale(1.05);
  }
}

.controls {
  &.disabled {
    .control {
      pointer-events: none;
      opacity: 0.5;
    }
  }
}
</style>
