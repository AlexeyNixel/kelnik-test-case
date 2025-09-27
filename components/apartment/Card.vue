<template>
  <NuxtLink to="/" class="apartment-card">
    <div class="apartment-card__preview">
      <img :src="apartment.preview" :alt="`Планировка ${apartment.name}`" />
    </div>
    <div class="apartment-card__name">{{ apartment.name }}</div>
    <div class="apartment-card__area">{{ apartment.area }} м²</div>
    <div class="apartment-card__floor">
      <span>{{ apartment.floor }}</span>
      <span>из</span>
      <span>{{ apartment.maxFloor }}</span>
    </div>
    <div class="apartment-card__price">
      {{ useFormatPrice(apartment.price) }}
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  apartment: Apartment;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.apartment-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 120px;
  grid-template-rows: auto auto auto;
  gap: 12px 20px;
  padding: 16px 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  grid-template-areas:
    'name name name preview'
    'area floor price preview';
  transition: 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &__preview {
    width: 90%;
    grid-area: preview;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  &__name {
    grid-area: name;
    font-weight: bold;
  }

  &__area {
    grid-area: area;
    font-weight: bold;
  }

  &__floor {
    grid-area: floor;
  }

  &__floor span:nth-child(2) {
    margin: 0 4px;
  }

  &__price {
    grid-area: price;
    font-weight: bold;
  }
}

@media (min-width: 960px) {
  .apartment-card {
  }
}

@media (min-width: 1440px) {
  .apartment-card {
    grid-template-columns: 120px 120px 120px 120px 120px;
    grid-template-rows: none;
    gap: 20px;
    padding: 16px 24px;
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0;

    grid-template-areas: 'preview name area floor price';
  }
}
</style>
