import React from "react";
import { Icon as Iconify } from "@iconify/react";

export default function Icon(props) {
  const { icon } = props;
  return <Iconify icon={icon} {...props} />;
}
