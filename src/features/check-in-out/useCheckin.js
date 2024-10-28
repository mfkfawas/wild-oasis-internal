import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useChecking() {
  const queryClient = useQueryClient();

  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: bookingId =>
      updateBooking(bookingId, { status: 'checked-in', isPaid: true }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} has been checked in successfully`);
      // invalidata all the queries which are active in the page
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error('There was an error while checking in the booking');
    },
  });

  return { checkIn, isCheckingIn };
}
