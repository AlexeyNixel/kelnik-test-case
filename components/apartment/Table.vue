<template>
  <div class="table">
    <apartment-grid-header />
    <apartment-card
      v-for="apartment in apartmentStore.getSortApartments"
      :apartment="apartment"
      :key="apartment.id"
      v-if="apartmentStore.getSortApartments.length > 0"
    />
    <div class="apartment-not-found" v-else-if="!apartmentStore.isLoading">
      Квартиры не найдены
    </div>
  </div>
</template>

<script lang="ts" setup>
const apartmentStore = useApartmentStore();
</script>

<style lang="scss" scoped>
.table {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .apartment-not-found {
    font-weight: 700;
    font-size: 24px;
    padding: 16px 0;
  }
}

@media (min-width: 1440px) {
  .table {
    gap: 0;
  }
}
</style>
