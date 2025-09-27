<template>
  <div class="table">
    <apartment-grid-header />
    <apartment-card
      v-for="apartment in apartmentStore.getSortApartments"
      :apartment="apartment"
      :key="apartment.id"
    />
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
}

@media (min-width: 1440px) {
  .table {
    gap: 0;
  }
}
</style>
