<template>
  <div class="common-layout">
    <slot />
    <button v-if="isScroll" @click="handleScrollUp" class="scroll-up">
      <icon icon="heroicons:arrow-long-up-16-solid" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

const isScroll = ref(false);

const handleScrollUp = () => {
  if (window) {
    window.scroll(0, 0);
  }
};

const checkSrollY = () => {
  isScroll.value = window.scrollY >= 300;
};

onMounted(async () => {
  if (import.meta.client) {
    document.addEventListener('scroll', checkSrollY);
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('scroll', checkSrollY);
  }
});
</script>

<style scoped lang="scss">
.common-layout {
  margin: 0 auto;
  padding: 48px 54px;
  max-width: 1440px;
}

.scroll-up {
  position: fixed;
  bottom: 50px;
  right: 100px;

  padding: 10px;
  height: 50px;
  width: 50px;
  border: none;
  border-radius: 100%;
  font-size: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(149, 208, 161, 1);
  color: white;

  cursor: pointer;
  transition: transform 0.3s ease;

  &:active {
    transform: scale(0.9);
  }
}
</style>
