"use client";

import { signoutUser } from "@/features/auth/api/api";
import { clearAuthSession } from "@/features/auth/session";
import { useRouter } from "@/i18n/navigation";
import { useMutation } from "@tanstack/react-query";

type UseHeaderSessionOptions = {
  fallbackUserName: string;
  initialUserName: string;
  onSignoutSettled: () => void;
};

export function useHeaderSession({
  fallbackUserName,
  initialUserName,
  onSignoutSettled,
}: UseHeaderSessionOptions) {
  const router = useRouter();
  const userName = initialUserName || fallbackUserName;
  const signoutMutation = useMutation({
    mutationFn: signoutUser,
    onSettled: () => {
      onSignoutSettled();
      clearAuthSession();
      router.replace("/signin");
    },
  });

  return {
    isSignoutPending: signoutMutation.isPending,
    onLogOut: () => signoutMutation.mutate(),
    userName,
  };
}
