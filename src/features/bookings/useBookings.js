import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import useURL from '../../hooks/useURL';

export function useBookings() {
  const { searchParam: sortByValue } = useURL('sortBy', 'startDate-desc');
  const { searchParam: filterValue } = useURL('filter');
  const { searchParam: page } = useURL('page');

  // FILTER
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : // : { field: 'totalPrice', value: 5000, method: 'gte' };
        { field: 'status', value: filterValue };

  // SORT
  const [field, direction] = sortByValue.split('-');
  const sortBy = { field, direction };

  // INVALIDATE-QUERY-NOTES
  // 1) By default, queryClient.invalidateQueries({ queryKey: ['cabins'] }) will invalidate ALL cabins with or without parameters, so in general you don't need to worry about additional parameters.
  // 2) With queryClient.invalidateQueries({ queryKey: ['cabins'], {...some params here...} }) you will invalidate ONLY this specific query, but not main cabins
  // 3) With queryClient.invalidateQueries({ queryKey: ['cabins'], exact: true }) you will invalidate ONLY cabins

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isLoading, error, bookings, count };
}
