import withAuth from "@/middleware/auth";
import Logins from "@/src/logins/Logins";

export default function LoginsPage() {
  return <Logins />;
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
