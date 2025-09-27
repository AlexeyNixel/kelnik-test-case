<template>
  <div class="grid-header">
    <div
      v-for="field in fields"
      :key="field.key"
      :class="[
        `grid-header__item`,
        {
          'grid-header__item--sortable': field.sortable,
          'grid-header__item--active': sortField === field.key,
        },
      ]"
      @click="field.sortable ? handleSort(field.key) : null"
    >
      <div
        :class="[
          `grid-header__label`,
          {
            'grid-header__label--active': sortField === field.key,
          },
        ]"
      >
        {{ field.label }}
      </div>

      <div class="grid-header__arrows" v-if="field.sortable">
        <div
          :class="[
            `grid-header__arrow`,
            {
              'grid-header__arrow--active':
                sortField === field.key && sortOrder === 'asc',
            },
          ]"
        >
          <icon icon="heroicons:chevron-up-16-solid" />
        </div>
        <div
          :class="[
            `grid-header__arrow`,
            {
              'grid-header__arrow--active':
                sortField === field.key && sortOrder === 'desc',
            },
          ]"
        >
          <icon icon="heroicons:chevron-down-16-solid" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
const fields = [
  { key: 'preview', label: 'Планировка', sortable: false },
  { key: 'name', label: 'Квартира', sortable: false },
  { key: 'area', label: 'S, м²', sortable: true },
  { key: 'floor', label: 'Этаж', sortable: true },
  { key: 'price', label: 'Цена, ₽', sortable: true },
];

const apartmentStore = useApartmentStore();
const { sortField, sortOrder } = storeToRefs(apartmentStore);

const handleSort = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field as 'area' | 'floor' | 'price';
    sortOrder.value = 'asc';
  }
};
</script>

<style lang="scss" scoped>
.grid-header {
  display: grid;
  grid-template-columns: 120px 120px 120px;
  padding: 16px 0;

  &__item {
    display: flex;
    align-items: center;

    &:nth-child(1) {
      display: none;
    }

    &:nth-child(2) {
      display: none;
    }

    &--sortable {
      user-select: none;
      cursor: pointer;
    }
  }

  &__label {
    &--active {
      color: rgba(62, 181, 124, 1);
    }
  }

  &__arrows {
    margin-left: 5px;
    display: flex;
    align-items: center;
    flex-direction: column;
    line-height: 0.1px;
    color: black;
  }
  &__arrow {
    &:first-child {
      transform: translateY(4px);
    }
    &:last-child {
      transform: translateY(-4px);
    }
    &--active {
      color: green;
    }
  }
}

@media (min-width: 1440px) {
  .grid-header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    grid-template-columns: 120px 120px 120px 120px 120px;
    gap: 20px;
    &__item {
      &:nth-child(1) {
        display: block;
      }

      &:nth-child(2) {
        display: block;
      }
    }
  }
}
</style>
