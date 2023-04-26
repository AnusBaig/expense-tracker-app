import React, { ReactNode, useState } from "react";
import { ButtonClasses } from "../../../../enums/buttonClasses";
import { Modal } from "react-bootstrap";
import "../Button/Button.module.css";
import { ColorType } from "../../../../types/colorType";

interface Props {
  text: string;
  color?: ColorType;
  containsOutline?: boolean;
  disable?: boolean;
  isSubmit?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

const Button = ({
  text,
  color,
  containsOutline,
  disable,
  children,
  isSubmit,
  onClick,
}: Props) => {
  const buttonClass = `${ButtonClasses.baseClass} ${ButtonClasses.baseClass}${
    containsOutline ? "-outline" : ""
  }-${color ?? ButtonClasses.defaultColor}`;

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
        className={`${buttonClass} m-4`}
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
