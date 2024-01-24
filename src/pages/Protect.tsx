import React, { useEffect } from "react";
import { useHistory } from "react-router";
export default function Protect(props: { Cmp: any }) {
  let Cmp = props.Cmp;
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("UID")) {
      history.push("/");
    }
  });
  return (
    <>
      <Cmp />
    </>
  );
}
