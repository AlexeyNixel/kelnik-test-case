<template>
  <div class="range">
    <h3 class="range__title">{{ lable }}</h3>
    <div class="range__output-data">
      <div class="range__price-value">
        <span class="range__label">от</span>
        <span class="range__price-number">
          {{ useFormatPrice(minPrice) }}
        </span>
      </div>
      <div class="range__price-value">
        <span class="range__label">до</span>
        <span class="range__price-number">
          {{ useFormatPrice(maxPrice) }}
        </span>
      </div>
    </div>

    <client-only>
      <VueDoubleRangeInput
        :min="min"
        :max="max"
        v-model:minValue="minPrice"
        v-model:maxValue="maxPrice"
        @update:minValue="handleMinUpdate"
        @update:maxValue="handleMaxUpdate"
        :show-numbers="false"
        color="#3EB57C"
        handler-color="#3EB57C"
        track-height="3px"
        handler-radius="14px"
      />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
//@ts-ignore
import VueDoubleRangeInput from 'vue-double-range-input';
import 'vue-double-range-input/dist/style.css';

interface Props {
  min: number;
  max: number;
  minValue?: number;
  maxValue?: number;
  lable?: string;
}

const props = withDefaults(defineProps<Props>(), {
  minValue: 0,
  maxValue: 100000,
});

const minPrice = ref(props.minValue as number);
const maxPrice = ref(props.maxValue as number);

const emit = defineEmits<{
  'update:minValue': [value: number];
  'update:maxValue': [value: number];
}>();

const handleMinUpdate = (value: string | number) => {
  const numValue = typeof value === 'string' ? Number(value) : value;
  minPrice.value = numValue;
  emit('update:minValue', numValue);
};

const handleMaxUpdate = (value: string | number) => {
  const numValue = typeof value === 'string' ? Number(value) : value;
  maxPrice.value = numValue;
  emit('update:maxValue', numValue);
};

watch(
  () => props.minValue,
  (newValue) => {
    minPrice.value = newValue;
  }
);

watch(
  () => props.maxValue,
  (newValue) => {
    maxPrice.value = newValue;
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
