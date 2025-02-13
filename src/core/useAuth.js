// "use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Config from "./config";

export function useAuth(redirectTo = "/login") {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch(Config.baseApiUrl() + "user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await res.json();
          if (!res.ok) {
            throw new Error(result.message);
          }
          setUser(result.data);
        } catch (error) {
          console.error(error);
          localStorage.removeItem("token");
          router.push(redirectTo);
        }
      } else {
        router.push(redirectTo);
      }
    };

    fetchUser();
  }, [router, redirectTo]);

  return user;
}