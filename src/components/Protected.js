import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const locLogin = localStorage.getItem("login");
    if (!locLogin) {
      navigate("/login");
    }
  });

  return (
    <>
      <Component />
    </>
  );
};

export default Protected;
