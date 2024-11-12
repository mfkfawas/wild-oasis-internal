import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { signup as signupApi } from '../../services/apiAuth';

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),
    onSuccess: () => {
      toast.success('Signup successful');
    },
    onError: err => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { signup, isLoading };
}
