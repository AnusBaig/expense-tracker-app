import React, { ReactNode, useState } from "react";
import { ButtonClasses } from "../../../../enums/buttonClasses";
import { Modal } from "react-bootstrap";
import "../Button/Button.module.css";
import { ColorType } from "../../../../types/colorType";
import { Size } from "../../../../types/size";

interface Props {
  text: string;
  color?: ColorType;
  size?: Size;
  containsOutline?: boolean;
  disable?: boolean;
  isSubmit?: boolean;
  noSpacing?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

const Button = ({
  text,
  color,
  size,
  containsOutline,
  disable,
  children,
  isSubmit,
  noSpacing,
  onClick,
}: Props) => {
  const buttonClass = `${ButtonClasses.baseClass} ${ButtonClasses.baseClass}${
    containsOutline ? "-outline" : ""
  }-${color ?? ButtonClasses.defaultColor} ${
    size && `${ButtonClasses.baseClass}-${size}`
  }`;

  const [isModalVisible, setModalVisibility] = useState(false);

  const handleCloseModal = () => setModalVisibility(false);
  const handleOnClick = () => {
    onClick && onClick();
    setModalVisibility(children != null);
  };

  return (
    <>
      <button
        type={isSubmit ? "submit" : "button"}
        className={`${buttonClass} ${!noSpacing && "m-4"}`}
        disabled={disable}
        onClick={handleOnClick}
      >
        {text}
      </button>
      <Modal
        show={isModalVisible}
        onHide={handleCloseModal}
        contentClassName='border-0 shadow rounded p-3'
      >
        {children}
      </Modal>
    </>
  );
};

export default Button;
