import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { TAuthDataResponse, TAuthnDataRequest } from '@/types';
import { apiClient } from '@/utils';
import { API_ENDPOINTS } from '@/utils/auth-config';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: loginUser, error } = useMutation({
    mutationFn: async (data: TAuthnDataRequest) => {
      try {
        const loginData = await apiClient.post(API_ENDPOINTS.LOGIN, data);
        return loginData.data;
        // biome-ignore lint/suspicious/noExplicitAny: <Error>
      } catch (error: any) {
        throw new Error(
          error.response?.data.message || 'AUTH_ERROR_INVALID_CREDENTIALS',
        );
      }
    },
    onSuccess: (data: TAuthDataResponse) => {
      queryClient.setQueryData(['auth', 'user'], data.user);
      queryClient
        .invalidateQueries({ queryKey: ['auth'] })
        .catch(console.error);
      router.push('/cave');
    },
  });

  return {
    loginUser,
    error,
  };
};
