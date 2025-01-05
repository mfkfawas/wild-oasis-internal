import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';

import useURL from '../../hooks/useURL';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
  const { searchParam: numDays } = useURL('last', 7);

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    stay => stay.status === 'checked-in' || stay.status === 'checked-out'
  );

  return { isLoading, stays, confirmedStays, numDays };
}
