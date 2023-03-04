import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import withAuth from "@/middleware/auth";
import PagesHeader from "@/components/PagesHeader";

export default function Phones() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) router.push("/");
  }, []);

  return (
    <div>
      <PagesHeader title="Phones" />
      <div>asd</div>
    </div>
  );
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
