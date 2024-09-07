import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    //react-query only allow us to pass a single parameter to the mutationFn
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('New setting successfully updateed');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: err => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
