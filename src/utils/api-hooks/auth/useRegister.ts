import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import type { TAuthDataResponse, TAuthnDataRequest } from '@/types';
import { apiClient } from '@/utils';
import { API_ENDPOINTS } from '@/utils/auth-config';

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: signInUser, error } = useMutation({
    mutationFn: async (data: TAuthnDataRequest) => {
      try {
        const response = await apiClient.post(API_ENDPOINTS.REGISTER, data);
        return response.data;
      } catch (error) {
        // biome-ignore lint/complexity/noUselessCatch: <to do>
        throw error;
      }
    },
    onSuccess: (data: TAuthDataResponse) => {
      queryClient.setQueryData(['auth', 'user'], data.user);
      queryClient
        .invalidateQueries({ queryKey: ['auth'] })
        .catch(console.error);
      router.push('/cave');
    },
    onError: (error: AxiosError<TAuthDataResponse>) => {
      return error.response?.data.message;
    },
  });

  return {
    signInUser,
    error,
  };
};
