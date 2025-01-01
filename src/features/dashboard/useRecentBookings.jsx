import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';

import useURL from '../../hooks/useURL';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
  const { searchParam: numDays } = useURL('last', 7);

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last-${numDays}`],
  });

  return { isLoading, bookings };
}
