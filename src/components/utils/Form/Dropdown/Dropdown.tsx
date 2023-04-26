import React, { useEffect, useState } from "react";
import FormDropdownItemModel from "../../../../types/form/formDropdownItem";
import styles from "../Dropdown/Dropdown.module.css";
import { UseFormRegister } from "react-hook-form";
import { ColorType } from "../../../../types/colorType";
import FormDropdownItem from "../../../../types/form/formDropdownItem";

interface Props {
  name: string;
  label: string;
  text: string;
  items: FormDropdownItemModel[];
  value?: string;
  error?: string;
  color?: ColorType;
  isRequired?: boolean;
  isDisabled?: boolean;
  isOutlined?: boolean;
  isReferenced?: boolean;
  isAutoClosed?: boolean;
  doRegister: UseFormRegister<any>;
  trigger: (name: string | string[]) => Promise<boolean>;
  setValue: (name: string, value: unknown, config?: Object) => void;
  onSelect: (item: FormDropdownItemModel) => void;
}

const Dropdown = ({
  name,
  label,
  text,
  items,
  value,
  error,
  color,
  isRequired,
  isDisabled,
  isOutlined,
  isReferenced,
  isAutoClosed,
  trigger,
  setValue,
  doRegister,
  onSelect,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<FormDropdownItem>();

  useEffect(
    () => setSelectedItem(items.find((i) => i.value === value)),
    [value]
  );

  useEffect(() => setValue(name, selectedItem?.value), [selectedItem]);

  const handleSelected = (item: FormDropdownItemModel) => {
    setSelectedItem(item);
    setValue(name, item.value, { shouldValidate: true });
    onSelect(item);
  };

  const handleClick = async () => await trigger(name);

  return (
    <div className='mb-3'>
      <div className='d-flex align-middle'>
        <label
          htmlFor={name}
          className={["form-label", "d-flex", styles["title"]].join(" ")}
        >
          {label}
          {isRequired && <span className='ps-2 text-danger'>*</span>}
        </label>
        <div className='btn-group w-100'>
          <button
            id={name}
            type='button'
            className={`btn btn-${isOutlined ? "outline-" : ""}${
              color || "light"
            } dropdown-toggle`}
            onClick={handleClick}
            disabled={isDisabled}
            data-bs-toggle='dropdown'
            data-bs-auto-close={isAutoClosed}
            data-bs-reference={isReferenced ? "parent" : "none"}
            aria-expanded='false'
          >
            {selectedItem?.text || text}
          </button>
          <select
            {...doRegister(name)}
            name={name}
            aria-label={label}
            value={selectedItem?.value}
            className='d-none'
          >
            {items.map((i, index) => (
              <option key={index + 1} disabled={i.isHeading} value={i.value}>
                {i.text}
              </option>
            ))}
          </select>
          <ul className={["dropdown-menu", styles["expandMenu"]].join(" ")}>
            {items.map((i, index) => (
              <>
                {i.isSeparated && (
                  <li key={`${index + 1}-separator`}>
                    <hr className='dropdown-divider' />
                  </li>
                )}
                <li key={index + 1}>
                  {i.isHeading ? (
                    <h6 className='dropdown-header fs-5 bg-light'>{i.text}</h6>
                  ) : (
                    <a
                      className={`dropdown-item ${
                        selectedItem?.value == i.value && !i.isHeading
                          ? "active"
                          : ""
                      }`}
                      data-value={i.value}
                      href={i.link || "#"}
                      onClick={() => handleSelected(i)}
                    >
                      {i.text}
                    </a>
                  )}
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
      {error && <p className='text-danger text-center'>{error}</p>}
    </div>
  );
};

export default Dropdown;
