"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignOut() {
  const router = useRouter();

  const handleSignOut = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Logged out successfully");
        },
        onError: (error: any) => {
          toast.error(`Logout failed: ${error.message}`);
        },
      },
    });
  };

  return handleSignOut;
}
