import { mockApartments } from '~/server/mocks/apartments';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const limit = 20;
  const offset = parseInt(query.offset as string) || 0;

  const minPrice = parseInt(query.min_price as string) || 0;
  const maxPrice = parseInt(query.max_price as string) || 10000000;
  const minArea = parseInt(query.min_area as string) || 0;
  const maxArea = parseInt(query.max_area as string) || 300;
  const rooms = parseInt(query.rooms as string) || undefined;

  await new Promise((resolve) => setTimeout(resolve, 500));

  const filteredData = mockApartments.filter((apartament) => {
    const priceMatch =
      apartament.price >= minPrice && apartament.price <= maxPrice;

    const areaMatch =
      Number(apartament.area) >= minArea && Number(apartament.area) <= maxArea;

    const roomsMatch = apartament.rooms === rooms || rooms === undefined;

    return priceMatch && areaMatch && roomsMatch;
  });

  const paginationData = filteredData.slice(offset, offset + limit);
  const hasMore = offset + limit < filteredData.length;

  return {
    status: 'success',
    data: paginationData,
    hasMore: hasMore,
  };
});
