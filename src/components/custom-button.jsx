import React from "react";

const CustomButton = ({ num, id, handleClick }) => (
  <button className="custom-button" id={id} onClick={handleClick} value={num}>
    {num}
  </button>
);
export default CustomButton;
