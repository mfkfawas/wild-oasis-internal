import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { login as loginApi } from '../../services/apiAuth';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: user => {
      // manually set the user in the user query cache
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard');
    },
    onError: err => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { login, isLoading };
}
