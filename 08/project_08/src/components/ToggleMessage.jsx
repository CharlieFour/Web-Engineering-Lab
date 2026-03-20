import React, { useState, useEffect } from "react";

const ToggleMessage = ({ text }) => {

  useEffect(() => {
    console.log(text + " Mounted");

    return () => {
      console.log(text + " Unmounted");
    };
  }, []);

  return <h3 className="toggle-message">{text}</h3>;
};

export default ToggleMessage;