import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteBooking } from '../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: bookingDelete, isLoading: isDeleting } = useMutation({
    mutationFn: bookingId => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success(`Booking has been deleted successfully`);
      // invalidata all the queries which are active in the page
      queryClient.invalidateQueries({ active: true });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { bookingDelete, isDeleting };
}
