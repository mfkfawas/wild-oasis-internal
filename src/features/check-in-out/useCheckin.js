import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateBooking } from '../../services/apiBookings';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} has been checked in successfully`);
      // invalidata all the queries which are active in the page
      queryClient.invalidateQueries({ active: true });
      navigate('/bookings');
    },
    onError: () => {
      toast.error('There was an error while checking in the booking');
    },
  });

  return { checkIn, isCheckingIn };
}
