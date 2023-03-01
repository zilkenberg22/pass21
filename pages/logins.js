import Logins from "@/src/logins/Logins";
import withAuth from "@/middleware/auth";

export default function LoginsPage() {
  return <Logins />;
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
