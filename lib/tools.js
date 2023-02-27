import { notification } from "antd";
import { useEffect, useState } from "react";

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
