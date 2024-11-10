import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import { login as loginApi } from '../../services/apiAuth';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const to = location.state?.from || { pathname: '/dashboard', search: '' };

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: data => {
      // manually set the user in the user query cache(why because in the ProtectedRoute we are calling useUser which have the same data as data.user)
      queryClient.setQueryData(['user'], data.user);
      navigate(`${to.pathname}${to.search}`, { replace: true });
    },
    onError: err => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { login, isLoading };
}

//  setQueryData()
//  Updates the cache for a specific query by its exact query key.
//  queryClient.setQueryData(['user', userId], (oldData) => ({
//    ...oldData,
//    name: 'Updated Name',
//  }));

//  setQueriesData():
//   Updates the cache for multiple queries that match a partial query key.
//   queryClient.setQueriesData(['user'], (oldData) => ({
//     ...oldData,
//     status: 'active',
//   }));
