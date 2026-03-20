import React from "react";

const MessageBox = ({ show, message }) => {
    console.log("MessageBox Rendered with show =", show);
  return (
    <div className="message-box">
        {show && <h2>{message}</h2>}
    </div>
   );
};
export default MessageBox;