<template>
  <div class="apartments">
    <div class="apartments__filter">
      <apartment-filter />
    </div>
    <div class="apartments__content">
      <h1 class="apartments__header">Квартиры</h1>

      <div class="apartments__results">
        <apartment-table />
      </div>

      <div class="apartments__load-more">
        <div v-if="isLoading">Данные загружаются</div>
        <button @click="handleFetchMore" v-if="hasMore && !isLoading">
          Загрузить еще
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const apartmentStore = useApartmentStore();

const { hasMore } = storeToRefs(apartmentStore);
const { isLoading } = storeToRefs(apartmentStore);

const handleFetchMore = async () => {
  await apartmentStore.fetchApartments();
};

onMounted(async () => {
  await apartmentStore.fetchApartments();
});

onUnmounted(() => {});
</script>

<style scoped lang="scss">
.apartments {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;

  &__content {
    display: grid;
    grid-template-columns: auto;
    gap: 24px;
    width: 60%;
  }

  &__header {
    font-weight: bold;
    font-size: 54px;
    margin: 0;
  }

  &__load-more {
    button {
      background-color: transparent;
      padding: 8px 24px;
      border-radius: 25px;
      font-size: 16px;
      border: 1px solid rgba(11, 23, 57, 0.2);
      transition: all 0.3s ease;

      &:hover {
        cursor: pointer;
        background-color: rgb(214, 214, 214);
      }
    }
  }
}

@media (min-width: 1440px) {
  .apartments {
    gap: 80px;

    &__content {
      gap: 48px;
    }
  }
}
</style>
