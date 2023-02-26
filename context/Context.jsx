import React, { createContext, useState } from "react";
export const Ctx = createContext({});

export default function Context({ children }) {
  const [ctxData, setCtxData] = useState({});

  function setleye() {
    setCtxData({ ...ctxData });
  }

  return <Ctx.Provider value={{ ctxData, setleye }}>{children}</Ctx.Provider>;
}
