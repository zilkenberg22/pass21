import React, { useEffect, useState } from "react";
import { Slider } from "antd";
import Icon from "@/components/Icon";
import { generatePassword } from "@/lib/tools";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [configs, setConfigs] = useState({
    slideLength: 12,
    mixedCase: true,
    numbers: true,
    punctuation: true,
  });

  useEffect(() => {
    genPass();
  }, []);

  function changeConfig(key, value) {
    if (key === "slideLength") configs[key] = value;
    else configs[key] = !configs[key];
    setConfigs({ ...configs });
    genPass();
  }

  function genPass() {
    var pass = generatePassword(configs);
    setPassword(pass);
  }

  function copyPassword() {
    navigator.clipboard.writeText(password);
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="md:text-2xl font-semibold text-center">
        Create strong passwords with Password Generator
      </div>
      <div
        className={`flex flex-col p-2 gap-2 ${
          configs.slideLength > 11
            ? "bg-[#393]"
            : configs.slideLength >= 6 && configs.slideLength <= 11
            ? "bg-[#f9622f]"
            : configs.slideLength < 6 &&
              configs.slideLength >= 4 &&
              "bg-[#c81a00]"
        }`}
      >
        <div className="flex items-center border-b-4 border-white py-4 gap-x-4">
          <div className=" md:w-[70%]  md:text-3xl tracking-[0.3rem] text-white">
            {password}
          </div>
          <button onClick={() => genPass()}>
            <Icon
              icon="mdi:refresh"
              className="text-base lg:text-5xl text-white"
            />
          </button>
          <button
            className="bg-yellow-300 p-3 opacity-1 rounded"
            onClick={() => copyPassword()}
          >
            Copy Password
          </button>
        </div>
        <button className="flex items-center gap-2">
          <Icon
            icon="mdi:check-circle-outline"
            className="text-xl text-white"
          />
          <span className="font-semibold text-white">{`${
            configs.slideLength > 11
              ? "Strong"
              : configs.slideLength >= 6 && configs.slideLength <= 11
              ? "Weak"
              : configs.slideLength < 6 && configs.slideLength >= 4 && "Bad"
          } password`}</span>
        </button>
      </div>
      <div className="px-4 gap-10">
        <div>
          <div>
            Use the slider, and select from the options, below, to lengthen your
            password and strengthen your security.
          </div>
          <div>Password Length (4-64)</div>
        </div>
        <div className="">
          <Slider
            min={4}
            max={64}
            tooltip={{
              open: true,
            }}
            value={configs.slideLength}
            onChange={(e) => changeConfig("slideLength", e)}
          />
        </div>
        <div className="md:flex items-center gap-x-5">
          <div className="flex gap-2 text-xl items-center">
            <input type="checkbox" className="w-[20px] h-[20px]" checked />
            Letters
          </div>
          <div className="flex gap-2 text-xl items-center">
            <input
              type="checkbox"
              className="w-[20px] h-[20px]"
              checked={configs.mixedCase}
              onChange={() => changeConfig("mixedCase")}
            />
            Mixed case
          </div>
          <div className="flex gap-2 text-xl items-center">
            <input
              type="checkbox"
              className="w-[20px] h-[20px]"
              checked={configs.punctuation}
              onChange={() => changeConfig("punctuation")}
            />
            Punctuation
          </div>
          <div className="flex gap-2 text-xl items-center">
            <input
              type="checkbox"
              className="w-[20px] h-[20px]"
              checked={configs.numbers}
              onChange={() => changeConfig("numbers")}
            />
            Numbers
          </div>
        </div>
      </div>
    </div>
  );
}
