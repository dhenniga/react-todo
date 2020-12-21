import React from "react";
import { useTheme } from "styled-components";

const WatchIcon = ({ isOverDue }) => {

  const marp = useTheme().buttonIconColor;

  return (

    <svg
      width="12"
      height="12">
      <path
        d="M6 6h1.5v.999H5.003v-3H6zm4.5-.501h-.533a4.134 4.134 0 00-1.323-2.546C8 2.37 8.027 1.83 7.715 0H3.788c-.315 1.83-.286 2.37-.93 2.953a4.128 4.128 0 00.002 6.125c.64.584.616 1.134.927 2.922h3.927c.31-1.788.286-2.34.927-2.922a4.136 4.136 0 001.33-2.577h.53zm-4.748 3.75a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5z"
        fill={isOverDue ? "white" : marp}
      />
    </svg>
  )
}

export default WatchIcon;