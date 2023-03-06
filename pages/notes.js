import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import withAuth from "@/middleware/auth";
import PagesHeader from "@/components/PagesHeader";
import EmptyData from "@/components/EmptyData";

export default function Notes() {
  const router = useRouter();
  const { data: session } = useSession();
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    if (!session) router.push("/");
  }, []);

  return (
    <div>
      <PagesHeader title="Notes" />
      {dataList.length === 0 ? <EmptyData /> : <div>asd</div>}
    </div>
  );
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
