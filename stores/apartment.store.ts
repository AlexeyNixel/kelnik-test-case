export interface Apartment {
  id: number;
  name: string;
  area: string;
  floor: number;
  maxFloor: number;
  rooms: number;
  price: number;
  preview: string;
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
    price: [0, 10000000],
    area: [0, 300],
    rooms: undefined as number | undefined,
  });

  //getters
  const getSortApartments = computed(() => {
    return apartments.value.slice().sort((a, b) => {
      const aValue = a[sortField.value] as number;
      const bValue = b[sortField.value] as number;

      return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue;
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
    filters.price = [0, 10000000];
    filters.area = [0, 300];
    filters.rooms = undefined;
    offset.value = 0;
  };

  const fetchApartments = async () => {
    if (isLoading.value) return;

    isLoading.value = true;

    try {
      const res = await $fetch('/api/apartments', {
        query: {
          offset: offset.value,
          min_price: filters.price[0],
          max_price: filters.price[1],
          min_area: filters.area[0],
          max_area: filters.area[1],
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
    useDebounce(() => setFilters(), 500),
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
