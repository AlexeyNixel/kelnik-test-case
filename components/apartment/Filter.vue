<template>
  <div class="apartment-filter">
    <div class="apartment-filter__section">
      <div class="apartment-filter__rooms">
        <div
          v-for="room in rooms"
          :key="room.id"
          @click="toggleRoom(room)"
          :class="[
            'apartment-filter__item',
            {
              'apartment-filter__item--active':
                apartmentStore.filters.rooms === room.id,
              'apartment-filter__item--disabled': room.disable,
            },
          ]"
        >
          {{ room.lable }}
        </div>
      </div>
    </div>

    <ui-custom-range
      :min="limits.price.min"
      :max="limits.price.max"
      v-model="apartmentStore.filters.price"
      lable="Стоимость квартиры, ₽"
    />

    <ui-custom-range
      :min="limits.area.min"
      :max="limits.area.max"
      v-model="apartmentStore.filters.area"
      lable="Площадь, м²"
    />
    <div @click="apartmentStore.resetFilters()" class="apartment-filter__clear">
      <span>Сбросить параметры</span>
      <Icon icon="heroicons:x-mark-20-solid" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

const apartmentStore = useApartmentStore();

interface Room {
  id: number;
  lable: string;
  disable: boolean;
}

const rooms = ref<Room[]>([
  {
    id: 1,
    lable: '1к',
    disable: false,
  },
  {
    id: 2,
    lable: '2к',
    disable: false,
  },
  {
    id: 3,
    lable: '3к',
    disable: false,
  },
  {
    id: 4,
    lable: '4к',
    disable: true,
  },
]);

const limits = {
  price: { min: 0, max: 10000000 },
  area: { min: 0, max: 300 },
};

const toggleRoom = (room: Room) => {
  if (room.disable) return;

  const newRoomId =
    apartmentStore.filters.rooms === room.id ? undefined : room.id;
  apartmentStore.setFilters({ rooms: newRoomId });
};
</script>

<style lang="scss" scoped>
.apartment-filter {
  position: sticky;
  top: 10px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: max-content;
  background: linear-gradient(
    135deg,
    rgba(174, 228, 178, 0.3) 0%,
    rgba(149, 208, 161, 0.3) 100%
  );
  border-radius: 16px;
  padding: 20px;
  width: 320px;

  &__section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__rooms {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;

    background-color: white;
    border: 2px solid transparent;
    border-radius: 100%;

    font-size: 16px;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover:not(&--disabled) {
      border-color: rgba(62, 181, 124, 0.3);
    }

    &--active {
      color: white;
      background: linear-gradient(135deg, #3eb57c 0%, #2d9c6b 100%);
      transform: scale(1.05);
    }

    &--disabled {
      background-color: #f7fafc;
      color: #cbd5e0;
      cursor: not-allowed;
      opacity: 0.9;
    }
  }

  &__clear {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 16px;
    border-radius: 12px;
    transition: 0.3s;
    width: max-content;
    cursor: pointer;
    &:hover {
      background: #f7fafc;
    }
  }
}

@media (min-width: 1440px) {
  .apartment-filter {
    padding: 40px;
    width: 400px;
  }
}
</style>
