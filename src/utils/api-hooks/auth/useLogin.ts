import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TAuthnDataRequest, TAuthDataResponse } from "@/types";
import { apiClient } from "@/utils";
import { API_ENDPOINTS } from "@/utils/auth-config";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: loginUser, error } = useMutation({
    mutationFn: async (data: TAuthnDataRequest) => {
      try {
        const loginData = await apiClient.post(API_ENDPOINTS.LOGIN, data);
        return loginData.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data: TAuthDataResponse) => {
      queryClient.setQueryData(["auth", "user"], data.user);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push("/cave");
    },
    onError: (error: AxiosError<TAuthDataResponse>) => {
      return error.response?.data.message;
    },
  });

  return {
    loginUser,
    error,
  };
};
