'use client';

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PrivateRoutes = ["/profile", "/notes"];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { setUser, clearIsAuthenticated } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await checkSession();
        const user = await getMe();
        setUser(user);
      } catch {
        clearIsAuthenticated();

        if (PrivateRoutes.some((r) => pathname.startsWith(r))) {
          router.push("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [clearIsAuthenticated, pathname, router, setUser]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}