<template>
  <section class="range" aria-labelledby="range-title">
    <h3 id="range-title" class="range__title">{{ label }}</h3>

    <div class="range__output-data" role="status" aria-live="polite">
      <div class="range__price-value">
        <span class="range__label">от</span>
        <output
          class="range__price-number"
          for="range-min"
          :aria-label="`Минимальная цена: ${formattedMinPrice}`"
        >
          {{ formattedMinPrice }}
        </output>
      </div>
      <div class="range__price-value">
        <span class="range__label">до</span>
        <output
          class="range__price-number"
          for="range-max"
          :aria-label="`Максимальная цена: ${formattedMaxPrice}`"
        >
          {{ formattedMaxPrice }}
        </output>
      </div>
    </div>

    <div class="range__slider-wrapper">
      <USlider
        :min="min"
        :max="max"
        v-model="arrData"
        @update:model-value="handleUpdate"
        aria-labelledby="range-title"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  min: number;
  max: number;
  modelValue: number[];
  label?: string;
}

const props = defineProps<Props>();
const arrData = ref(props.modelValue);

const formattedMinPrice = computed(() => useFormatPrice(props.modelValue[0]));
const formattedMaxPrice = computed(() => useFormatPrice(props.modelValue[1]));

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
  useDebounce(() => (arrData.value = props.modelValue), 500),
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
