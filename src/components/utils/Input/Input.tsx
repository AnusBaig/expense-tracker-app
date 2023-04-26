import React, { FormEvent } from "react";
import { UseFormRegister } from "react-hook-form";
import styles from "./Input.module.css";

interface Props {
  name: string;
  type?: string;
  label: string;
  value?: string;
  placeholder?: string;
  error?: string;
  isDisable?: boolean;
  isRequired?: boolean;
  showCheck?: boolean;
  onChange?: (e: any) => void;
  doRegister: UseFormRegister<any>;
}

function Input({
  label,
  name,
  value,
  type,
  error,
  placeholder,
  isRequired,
  isDisable,
  showCheck,
  onChange,
  doRegister,
}: Props) {
  const inputRegister = doRegister(name, {
    required: isRequired == undefined ? true : isRequired,
    disabled: isDisable,
    valueAsNumber: type == "number",
    // valueAsDate: type == "date",
  });

  const handleOnChange = (e: FormEvent) => {
    inputRegister.onChange(e);
    onChange && onChange(e);
  };

  return (
    <div className='mb-3'>
      <div className='d-flex align-middle'>
        <label
          htmlFor={name}
          className={["form-label", styles["title"]].join(" ")}
        >
          {label}
          {isRequired && <span className='ps-2 text-danger'>*</span>}
        </label>
        <input
          {...inputRegister}
          id={name}
          type={type || "text"}
          disabled={isDisable}
          value={value}
          onChange={handleOnChange}
          placeholder={placeholder}
          className='form-control'
        />
        {showCheck && !error && (
          <span className={styles["checkValidity"]}>
            <i className='fa-solid fa-check text-success'></i>
          </span>
        )}
      </div>
      {error && <p className='text-danger text-center'>{error}</p>}
    </div>
  );
}

export default Input;
