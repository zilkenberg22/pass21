import { useEffect, useState } from "react";
import { Popover } from "antd";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import LoginsForm from "@/components/LoginsForm";
import PlusButton from "@/components/PlusButton";
import { openNotification } from "@/lib/tools";

export default function LoginsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(null);

  const [editData, setEditData] = useState(null);
  const [loginsData, setLoginsData] = useState([]);

  useEffect(() => {
    if (session) {
      getLogins();
    } else {
      router.push("/");
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

  async function edit(data) {
    try {
      const options = {
        method: "GET",
      };

      await fetch(`/api/logins/${data._id}`, options)
        .then((res) => res.json())
        .then((json) => {
          setEditData({ ...json.data });
          setShowForm(true);
        });
    } catch (error) {
      console.log(error, "error");
    }
  }

  async function getLogins() {
    try {
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${session?.user?._id}` },
      };

      await fetch("/api/logins", options)
        .then((res) => res.json())
        .then((data) => {
          setLoginsData([...data.data]);
        });
    } catch (error) {
      console.log(error, "error");
    }
  }

  function showPasswordComp(password) {
    const [depass, setDepass] = useState(null);

    useEffect(() => {
      async function fetchData() {
        try {
          const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: password }),
          };

          const response = await fetch("/api/decryptPassword", options);
          const data = await response.json();
          setDepass(data.user);
        } catch (error) {
          console.log(error, "error");
        }
      }

      fetchData();
    }, [password]);

    return depass !== null ? <div>{depass}</div> : <div>Loading...</div>;
  }

  async function copyPassword(password) {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password }),
      };

      const response = await fetch("/api/decryptPassword", options);
      const data = await response.json();
      navigator.clipboard.writeText(data.user);
    } catch (error) {
      console.log(error, "error");
    }
  }

  function actions(data) {
    return (
      <div className="w-32 cursor-pointer">
        <div
          className="border-b p-1"
          onClick={(e) => {
            e.stopPropagation();
            edit(data);
          }}
        >
          Edit
        </div>
        <div
          className="p-1"
          onClick={(e) => {
            e.stopPropagation();
            deleteLogin(data);
          }}
        >
          Delete
        </div>
      </div>
    );
  }

  async function deleteLogin(data) {
    try {
      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      await fetch(`/api/logins/${data._id}`, options)
        .then((res) => res.json())
        .then((json) => {
          console.log(json, "json");
          if (json.status) {
            openNotification({
              type: "success",
              title: "Мэдээллийг устгалаа",
            });
            getLogins();
          }
        });
    } catch (error) {
      console.log(error, "error");
    }
  }

  return (
    <div className="p-8">
      {!showForm ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-lg font-semibold">Logins</div>
              <div className="text-gray-500">2 websites / apps</div>
            </div>
            <input type="text" placeholder="Search for username and website" />
          </div>
          <div className="border rounded">
            <div className="flex w-full border-b p-2 gap-x-3">
              <div className="w-[4%]"></div>
              <div className="flex items-center w-[24%]">
                <span>Website</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="m7 10l5 5l5-5H7Z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="m7 15l5-5l5 5H7Z" />
                </svg>
              </div>
              <div className="w-[24%]">Username</div>
              <div className="w-[24%]">Password</div>
              <div className="w-[24%]"></div>
            </div>
            {loginsData.map((x, i) => (
              <div
                className={`group flex items-center p-2 gap-x-3 cursor-pointer group hover:bg-[#e8f4e4] ${
                  i !== 1 ? "border-b" : "border-b-0"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  edit(x);
                }}
              >
                <div className="w-[4%]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m19.65 9.04l-4.84-.42l-1.89-4.45c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.73l3.67-3.18c.67-.58.32-1.68-.56-1.75zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28L12 15.4z"
                    />
                  </svg>
                </div>
                <div className="w-[24%] flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="rounded-full border bg-[#f4f1ed] font-bold h-[32px] w-[32px] flex items-center justify-center">
                      {x.website.slice(0, 2)}
                    </div>
                    <span>{x.website}</span>
                  </div>
                  <button
                    className="hidden group-hover:flex mt-[2px]"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <a href={x.url} target="_blank" rel="noopener noreferrer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21h-7Zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5l-5 5Z"
                        />
                      </svg>
                    </a>
                  </button>
                </div>
                <div className="w-[24%] flex items-center justify-between">
                  <span>{x.username}</span>
                  <button
                    className="hidden group-hover:flex"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12V1Z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="w-[24%] flex items-center justify-between">
                  <div className="flex items-center justify-between">
                    <span>••••••</span>
                    <Popover
                      content={() => showPasswordComp(x.password)}
                      trigger="click"
                      open={showPassword === i}
                    >
                      {showPassword !== i ? (
                        <button
                          className=""
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowPassword(i);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0Z"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          className=""
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowPassword(null);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54L2 5.27M12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-4 5.19l-1.42-1.43A9.862 9.862 0 0 0 20.82 12A9.821 9.821 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.821 9.821 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13Z"
                            />
                          </svg>
                        </button>
                      )}
                    </Popover>
                  </div>
                  <button
                    className="hidden group-hover:flex mt-[4px]"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      copyPassword(x.password);
                    }}
                  >
                    <svg
                      class="sc-hLBbgP gGYheL sc-fSKiAx"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g>
                        <path
                          fill="currentColor"
                          d="M4.95981 16.1363H14.0521V5.03178H4.95981V16.1363ZM4.92511 3.54457C4.01588 3.54457 3.27196 4.25843 3.27196 5.13093V16.2354C3.27196 17.1079 4.01588 17.8218 4.92511 17.8218H14.0175C14.9267 17.8218 15.6706 17.1079 15.6706 16.2354V5.13093C15.6706 4.25843 14.9267 3.54457 14.0175 3.54457H4.92511ZM11.5721 0.272705C10.3541 0.272705 1.65316 0.272705 1.65316 0.272705C0.743924 0.272705 5.6227e-06 0.986566 5.6227e-06 1.85906C5.6227e-06 1.85906 1.00825e-05 11.7738 5.6227e-06 12.9636C1.16289e-06 14.1533 1.65316 14.1533 1.65316 12.9636C1.65315 11.7738 1.65316 1.85906 1.65316 1.85906C1.65316 1.85906 10.3541 1.85906 11.5721 1.85906C12.79 1.85906 12.79 0.272705 11.5721 0.272705Z"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M8.60564 11.6857L9.1111 12.1911C9.20419 12.2851 9.20419 12.435 9.1111 12.529L8.77414 12.866C8.68105 12.9591 8.53025 12.9591 8.43717 12.866L7.93149 12.3596L7.59452 12.6975L8.09997 13.203C8.19329 13.296 8.19329 13.4468 8.09997 13.5399L7.763 13.8769C7.66991 13.97 7.51912 13.97 7.42603 13.8769L6.92058 13.3714C6.73535 13.5567 6.43189 13.5567 6.24665 13.3714C6.06118 13.1862 6.06118 12.8827 6.24665 12.6975L9.67146 9.27198C9.331 8.64087 9.41989 7.83848 9.95327 7.3051C10.6049 6.65351 11.6614 6.65351 12.313 7.3051C12.9636 7.95575 12.9636 9.01227 12.313 9.66386C11.7787 10.1972 10.9772 10.2866 10.3452 9.94592L8.60564 11.6857ZM11.6391 7.97906C11.3599 7.69981 10.9066 7.69981 10.6273 7.97906C10.349 8.25737 10.349 8.71163 10.6273 8.98996C10.9066 9.26829 11.3599 9.26829 11.6391 8.98996C11.9175 8.71164 11.9175 8.25739 11.6391 7.97906Z"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </div>
                <div className="w-[24%] flex items-center justify-around">
                  <Popover
                    content={() => actions(x)}
                    trigger="click"
                    placement="bottomRight"
                    autoAdjustOverflow
                  >
                    <button
                      className="w-full flex justify-end"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z"
                        />
                      </svg>
                    </button>
                  </Popover>
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
