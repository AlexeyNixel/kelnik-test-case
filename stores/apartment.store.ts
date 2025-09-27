export interface Apartment {
  id: number;
  name: string;
  area: string;
  floor: number;
  maxFloor: number;
  price: number;
  preview: string;
  rooms: string;
}

export interface ApartmentResponse {
  data: Apartment[];
  hasMore: boolean;
  status: string;
}

export const useApartmentStore = defineStore('apartment', () => {
  //state
  const apartments = ref<Apartment[]>([]);

  const hasMore = ref(false);
  const isLoading = ref(false);
  const offset = ref(0);
  const stepOffset = ref(20);

  const sortOrder = ref<'asc' | 'desc'>('asc');
  const sortField = ref<'area' | 'floor' | 'price'>('area');

  const filters = reactive({
    price: { min: 0, max: 10000000 },
    area: { min: 0, max: 300 },
    rooms: undefined as number | undefined,
  });

  //getters
  const getSortApartments = computed(() => {
    return [...apartments.value].sort((a, b) => {
      let aValue: any = a[sortField.value];
      let bValue: any = b[sortField.value];

      if (sortOrder.value === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  });

  //actions
  const setFilters = (newFilters?: Partial<typeof filters>) => {
    Object.assign(filters, newFilters);
    offset.value = 0;
    apartments.value = [];
    fetchApartments();
  };

  const resetFilters = () => {
    filters.price = { min: 0, max: 10000000 };
    filters.area = { min: 0, max: 300 };
    filters.rooms = undefined;
    offset.value = 0;
    fetchApartments();
  };

  const fetchApartments = async () => {
    if (isLoading.value) return;

    isLoading.value = true;

    try {
      const res = await $fetch('/api/apartments', {
        query: {
          offset: offset.value,
          min_price: filters.price.min,
          max_price: filters.price.max,
          min_area: filters.area.min,
          max_area: filters.area.max,
          rooms: filters.rooms,
        },
      });

      if (res) {
        apartments.value = [...apartments.value, ...res.data];
        hasMore.value = res.hasMore;
        offset.value += stepOffset.value;
      }
      fetchApartments();
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  watch(
    filters,
    () => {
      console.log(filters);

      setFilters();
    },
    { deep: true }
  );

  return {
    hasMore,
    isLoading,
    filters,
    offset,
    apartments,
    sortOrder,
    sortField,
    setFilters,
    resetFilters,
    fetchApartments,
    getSortApartments,
  };
});
