<template>
  <button class="test-button">
    But I am a Vue component.
  </button>
</template>

<style lang="scss" scoped>
.test-button {
  padding: toRem(4) toRem(12);
  border: solid 1px $codGray;
  border-radius: toRem(18);
  background-color: $wildSand;
  transition: 150ms ease;
  &:hover {
    background-color: $codGray;
    color: $wildSand;
  }
}
</style>
