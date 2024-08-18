import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    // this will be executed if the mutation fn is successful
    onSuccess: () => {
      toast.success('Cabin deleted succesfully');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    // this will be executed if error is thrown by the mutation fn
    onError: err => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
