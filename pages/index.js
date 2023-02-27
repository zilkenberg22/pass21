import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [session]);

  return <div>Home</div>;
}
