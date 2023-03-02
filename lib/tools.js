import { useEffect, useState } from "react";
import { notification } from "antd";
import CryptoJS from "crypto-js";
import { createRoot } from "react-dom/client";
import Loader from "@/components/Loader";

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

export function generatePassword(config) {
  let characters = "abcdefghijklmnopqrstuvwxyz";
  if (config.mixedCase) {
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (config.punctuation) {
    characters += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  }
  if (config.numbers) {
    characters += "1234567890";
  }

  let password = "";
  for (let i = 0; i < config.slideLength; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
}

export function showLoader(value) {
  // const element = value ? (
  //   <div className={"contain"}>
  //     <div className="sk-circle">
  //       <div className="sk-circle1 sk-child"></div>
  //       <div className="sk-circle2 sk-child"></div>
  //       <div className="sk-circle3 sk-child"></div>
  //       <div className="sk-circle4 sk-child"></div>
  //       <div className="sk-circle5 sk-child"></div>
  //       <div className="sk-circle6 sk-child"></div>
  //       <div className="sk-circle7 sk-child"></div>
  //       <div className="sk-circle8 sk-child"></div>
  //       <div className="sk-circle9 sk-child"></div>
  //       <div className="sk-circle10 sk-child"></div>
  //       <div className="sk-circle11 sk-child"></div>
  //       <div className="sk-circle12 sk-child"></div>
  //     </div>
  //     <style jsx>{`
  //       .contain {
  //         width: 100%;
  //         height: 100%;
  //         display: flex;
  //         align-items: center;
  //         justify-content: center;
  //         background-color: #fff;
  //         opacity: 0.8;
  //         position: absolute;
  //         margin-left: 0px;
  //         margin-right: 0px;
  //         right: 0px;
  //         left: 0px;
  //         top: 0px;
  //         text-align: center;
  //         z-index: 1304;
  //       }
  //       .sk-circle {
  //         margin: 100px auto;
  //         width: 40px;
  //         height: 40px;
  //         position: relative;
  //       }
  //       .sk-circle .sk-child {
  //         width: 100%;
  //         height: 100%;
  //         position: absolute;
  //         left: 0;
  //         top: 0;
  //       }
  //       .sk-circle .sk-child:before {
  //         content: "";
  //         display: block;
  //         margin: 0 auto;
  //         width: 15%;
  //         height: 15%;
  //         background-color: #2ab538;
  //         border-radius: 100%;
  //         -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
  //         animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
  //       }
  //       .sk-circle .sk-circle2 {
  //         -webkit-transform: rotate(30deg);
  //         -ms-transform: rotate(30deg);
  //         transform: rotate(30deg);
  //       }
  //       .sk-circle .sk-circle3 {
  //         -webkit-transform: rotate(60deg);
  //         -ms-transform: rotate(60deg);
  //         transform: rotate(60deg);
  //       }
  //       .sk-circle .sk-circle4 {
  //         -webkit-transform: rotate(90deg);
  //         -ms-transform: rotate(90deg);
  //         transform: rotate(90deg);
  //       }
  //       .sk-circle .sk-circle5 {
  //         -webkit-transform: rotate(120deg);
  //         -ms-transform: rotate(120deg);
  //         transform: rotate(120deg);
  //       }
  //       .sk-circle .sk-circle6 {
  //         -webkit-transform: rotate(150deg);
  //         -ms-transform: rotate(150deg);
  //         transform: rotate(150deg);
  //       }
  //       .sk-circle .sk-circle7 {
  //         -webkit-transform: rotate(180deg);
  //         -ms-transform: rotate(180deg);
  //         transform: rotate(180deg);
  //       }
  //       .sk-circle .sk-circle8 {
  //         -webkit-transform: rotate(210deg);
  //         -ms-transform: rotate(210deg);
  //         transform: rotate(210deg);
  //       }
  //       .sk-circle .sk-circle9 {
  //         -webkit-transform: rotate(240deg);
  //         -ms-transform: rotate(240deg);
  //         transform: rotate(240deg);
  //       }
  //       .sk-circle .sk-circle10 {
  //         -webkit-transform: rotate(270deg);
  //         -ms-transform: rotate(270deg);
  //         transform: rotate(270deg);
  //       }
  //       .sk-circle .sk-circle11 {
  //         -webkit-transform: rotate(300deg);
  //         -ms-transform: rotate(300deg);
  //         transform: rotate(300deg);
  //       }
  //       .sk-circle .sk-circle12 {
  //         -webkit-transform: rotate(330deg);
  //         -ms-transform: rotate(330deg);
  //         transform: rotate(330deg);
  //       }
  //       .sk-circle .sk-circle2:before {
  //         -webkit-animation-delay: -1.1s;
  //         animation-delay: -1.1s;
  //       }
  //       .sk-circle .sk-circle3:before {
  //         -webkit-animation-delay: -1s;
  //         animation-delay: -1s;
  //       }
  //       .sk-circle .sk-circle4:before {
  //         -webkit-animation-delay: -0.9s;
  //         animation-delay: -0.9s;
  //       }
  //       .sk-circle .sk-circle5:before {
  //         -webkit-animation-delay: -0.8s;
  //         animation-delay: -0.8s;
  //       }
  //       .sk-circle .sk-circle6:before {
  //         -webkit-animation-delay: -0.7s;
  //         animation-delay: -0.7s;
  //       }
  //       .sk-circle .sk-circle7:before {
  //         -webkit-animation-delay: -0.6s;
  //         animation-delay: -0.6s;
  //       }
  //       .sk-circle .sk-circle8:before {
  //         -webkit-animation-delay: -0.5s;
  //         animation-delay: -0.5s;
  //       }
  //       .sk-circle .sk-circle9:before {
  //         -webkit-animation-delay: -0.4s;
  //         animation-delay: -0.4s;
  //       }
  //       .sk-circle .sk-circle10:before {
  //         -webkit-animation-delay: -0.3s;
  //         animation-delay: -0.3s;
  //       }
  //       .sk-circle .sk-circle11:before {
  //         -webkit-animation-delay: -0.2s;
  //         animation-delay: -0.2s;
  //       }
  //       .sk-circle .sk-circle12:before {
  //         -webkit-animation-delay: -0.1s;
  //         animation-delay: -0.1s;
  //       }
  //       @-webkit-keyframes sk-circleBounceDelay {
  //         0%,
  //         80%,
  //         100% {
  //           -webkit-transform: scale(0);
  //           transform: scale(0);
  //         }
  //         40% {
  //           -webkit-transform: scale(1);
  //           transform: scale(1);
  //         }
  //       }
  //       @keyframes sk-circleBounceDelay {
  //         0%,
  //         80%,
  //         100% {
  //           -webkit-transform: scale(0);
  //           transform: scale(0);
  //         }
  //         40% {
  //           -webkit-transform: scale(1);
  //           transform: scale(1);
  //         }
  //       }
  //     `}</style>
  //   </div>
  // ) : null;

  const root = createRoot(document.getElementById("khuleelgeKharuulakhEsekh"));
  if (value) root.render(<Loader />);
  else root.unmount();
}

// export function showLoader(value) {
//   const element = value ? (
//     <div className="sk-circle">
//       <div className="sk-circle1 sk-child"></div>
//       <div className="sk-circle2 sk-child"></div>
//       <div className="sk-circle3 sk-child"></div>
//       <div className="sk-circle4 sk-child"></div>
//       <div className="sk-circle5 sk-child"></div>
//       <div className="sk-circle6 sk-child"></div>
//       <div className="sk-circle7 sk-child"></div>
//       <div className="sk-circle8 sk-child"></div>
//       <div className="sk-circle9 sk-child"></div>
//       <div className="sk-circle10 sk-child"></div>
//       <div className="sk-circle11 sk-child"></div>
//       <div className="sk-circle12 sk-child"></div>
//     </div>
//   ) : null;

//   ReactDOM.render(element, document.getElementById("app"));
// }
