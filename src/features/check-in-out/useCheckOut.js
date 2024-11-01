import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateBooking } from '../../services/apiBookings';

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: bookingId =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} has been checked in successfully`);
      // invalidata all the queries which are active in the page
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error('There was an error while checking out the booking');
    },
  });

  return { checkOut, isCheckingOut };
}
