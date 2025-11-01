'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
        // biome-ignore lint/suspicious/noExplicitAny: <error>
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
    signInUser,
    error,
  };
};
