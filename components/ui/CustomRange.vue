<template>
  <div class="range">
    <h3 class="range__title">{{ lable }}</h3>
    <div class="range__output-data">
      <div class="range__price-value">
        <span class="range__label">от</span>
        <span class="range__price-number">
          {{ useFormatPrice(prices[0]) }}
        </span>
      </div>
      <div class="range__price-value">
        <span class="range__label">до</span>
        <span class="range__price-number">
          {{ useFormatPrice(prices[1]) }}
        </span>
      </div>
    </div>

    <USlider
      :min="min"
      :max="max"
      v-model="prices"
      @update:model-value="handleUpdate"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  min: number;
  max: number;
  modelValue: number[];
  lable?: string;
}

const props = defineProps<Props>();
const prices = ref(props.modelValue);

const emit = defineEmits<{
  'update:modelValue': [value: number[]];
}>();

const handleUpdate = (value: number[] | undefined) => {
  if (value) {
    emit('update:modelValue', value);
  }
};

watch(
  props,
  () => {
    prices.value = props.modelValue;
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.range {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__title {
    font-size: 16px;
    color: #2d3748;
    margin: 0;
  }

  &__output-data {
    display: flex;
    justify-content: space-between;
  }

  &__price-value {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__label {
    font-size: 14px;
    color: #718096;
  }

  &__price-number {
    font-size: 16px;
    font-weight: 700;
    color: #2d3748;
  }
}
</style>
