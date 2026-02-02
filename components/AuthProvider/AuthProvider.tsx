'use client';

import { checkSession } from "@/lib/api/clientApi";
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
                const user = await checkSession();

                if (!user && PrivateRoutes.some((r) => pathname.startsWith(r))) {
                    clearIsAuthenticated();
                    router.push("/sign-in");
                    return;
                }

                if (user)
                    setUser(user);
            } catch {
                clearIsAuthenticated();
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [clearIsAuthenticated, pathname, router, setUser]);
    
    if (loading)
        return <p>Loading...</p>;
    return <>{children}</>;
}