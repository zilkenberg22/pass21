import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { openNotification, showLoader } from "@/lib/tools";
import LoginsForm from "@/src/logins/LoginsForm";
import PlusButton from "@/components/PlusButton";
import Icon from "@/components/Icon";

export default function LoginsPage() {
  console.log("first");
  const router = useRouter();
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(null);
  const [decryptedPassword, setDecryptedPassword] = useState(null);

  const [editData, setEditData] = useState(null);
  const [loginsData, setLoginsData] = useState([]);

  useEffect(() => {
    if (session) {
      getLogins();
    } else {
      // router.push("/");
    }
  }, [session]);

  function addLogins() {
    setShowForm(true);
  }

  function back() {
    setShowForm(false);
    getLogins();
    setShowPassword(null);
  }

  async function editLogin(data) {
    try {
      const options = { method: "GET" };
      const response = await fetch(`/api/logins/${data._id}`, options);
      const json = await response.json();
      setEditData({ ...json.data });
      setShowForm(true);
    } catch (error) {
      console.log(error, "error");
    }
  }

  async function getLogins() {
    showLoader(true);
    try {
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${session?.user?._id}` },
      };
      const response = await fetch("/api/logins", options);
      const json = await response.json();
      setLoginsData([...json.data]);
      showLoader(false);
    } catch (error) {
      console.log(error, "error");
      showLoader(false);
    }
  }

  async function decryptPassword(password) {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      };
      const response = await fetch("/api/decryptPassword", options);
      const json = await response.json();
      setDecryptedPassword(json.user);
    } catch (error) {
      console.log(error, "error");
    }
  }

  async function copyPassword(password) {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password }),
      };
      const response = await fetch("/api/decryptPassword", options);
      const json = await response.json();
      navigator.clipboard.writeText(json.user);
    } catch (error) {
      console.log(error, "error");
    }
  }

  async function deleteLogin(data) {
    try {
      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const response = await fetch(`/api/logins/${data._id}`, options);
      const json = await response.json();
      if (json.status) {
        openNotification({
          type: "success",
          title: "Мэдээллийг устгалаа",
        });
        getLogins();
      }
    } catch (error) {
      console.log(error, "error");
    }
  }

  return (
    <div>
      {!showForm ? (
        <>
          <div className="md:flex md:justify-between items-center mb-6">
            <div>
              <div className="text-lg font-semibold">Logins</div>
              <div className="text-gray-500">2 websites / apps</div>
            </div>
            <input
              type="text"
              placeholder="Search for username and website"
              className="w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none mt-4 md:w-3/5"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loginsData.map((x, i) => (
              <div className="border rounded-lg p-2 grid gap-3" key={i}>
                <div className="flex w-full justify-between items-center">
                  <button>
                    <Icon icon="mdi:star-outline" className="text-xl" />
                  </button>
                  <div className="rounded-full border bg-[#f4f1ed] font-bold h-[32px] w-[32px] flex items-center justify-center">
                    {x.website.slice(0, 2)}
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <span>{x.website}</span>
                  {x.url && (
                    <button>
                      <a href={x.url} target="_blank" rel="noopener noreferrer">
                        <Icon icon="mdi:login" className="text-xl" />
                      </a>
                    </button>
                  )}
                </div>
                <div className="flex w-full justify-between">
                  <span>{x.username}</span>
                  <button
                    onClick={(e) => navigator.clipboard.writeText(x.username)}
                  >
                    <Icon icon="mdi:content-copy" className="text-xl" />
                  </button>
                </div>
                <div className="flex w-full justify-between">
                  <span>
                    {showPassword !== i ? "••••••" : decryptedPassword}
                  </span>
                  <div className="flex gap-2">
                    {showPassword !== i ? (
                      <button
                        onClick={() => {
                          setShowPassword(i);
                          decryptPassword(x.password);
                        }}
                      >
                        <Icon icon="mdi:eye-outline" className="text-xl" />
                      </button>
                    ) : (
                      <button onClick={() => setShowPassword(null)}>
                        <Icon icon="mdi:eye-off-outline" className="text-xl" />
                      </button>
                    )}
                    <button onClick={() => copyPassword(x.password)}>
                      <Icon icon="mdi:content-copy" className="text-xl" />
                    </button>
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <button
                    onClick={() => editLogin(x)}
                    className="flex gap-1 items-center"
                  >
                    <Icon icon="mdi:pencil" className="text-xl" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteLogin(x)}
                    className="flex gap-1 items-center"
                  >
                    <Icon icon="mdi:delete-outline" className="text-xl" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <PlusButton onClick={() => addLogins()} />
        </>
      ) : (
        <LoginsForm back={back} editData={editData} />
      )}
    </div>
  );
}
