import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isEditing } = useMutation({
    //react-query only allow us to pass a single parameter to the mutationFn
    mutationFn: ({ password, fullName, avatar }) =>
      updateCurrentUser({ password, fullName, avatar }),
    onSuccess: () => {
      toast.success('user account successfully updated');

      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: err => toast.error(err.message),
  });

  return { isEditing, updateUser };
}
