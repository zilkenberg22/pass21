import { useEffect, useState } from "react";
import { notification } from "antd";
import CryptoJS from "crypto-js";

export function getChildrenHeight() {
  const [bodyHeight, setBodyHeight] = useState(0);
  let navbar;
  if (typeof document !== "undefined") {
    navbar = document && document.querySelector("#Navbar");
  }
  let navbarHeight = 0;
  if (navbar) {
    navbarHeight = navbar.offsetHeight;
  }

  useEffect(() => {
    const undurOorchlogdohod = () =>
      setBodyHeight(window.innerHeight - navbarHeight);
    window.addEventListener("resize", undurOorchlogdohod);
    return () => {
      window.removeEventListener("resize", undurOorchlogdohod);
    };
  }, []);

  useEffect(() => {
    setBodyHeight(window.innerHeight - navbarHeight);
  }, [navbarHeight]);

  return bodyHeight;
}

export function openNotification({ type, title, message }) {
  const config = {
    message: title ? title : "",
    description: message ? message : "",
    placement: "bottomRight",
    duration: 2,
  };
  switch (type) {
    case "success":
      notification.success(config);
      break;
    case "error":
      notification.error(config);
      break;
    case "info":
      notification.info(config);
      break;
    case "warning":
      notification.warning(config);
      break;
    default:
      notification.open(config);
      break;
  }
}

export function encrypt(value) {
  const encryptedValue = CryptoJS.AES.encrypt(
    value,
    process.env.CRYPTO_SECRET_KEY
  ).toString();
  return encryptedValue;
}

export function decrypt(value) {
  const bytes = CryptoJS.AES.decrypt(value, process.env.CRYPTO_SECRET_KEY);
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedValue;
}

export function generatePassword(length) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
}
