import React, { FormEvent, useState } from "react";
import FormInputModel from "../../../types/form/formInput";
import FormButtonModel from "../../../types/form/formButton";
import styles from "../Form/Form.module.css";
import FormModel from "../../../types/form/form";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import FormDropDown from "../../../types/form/formDropdown";
import FormDropdown from "../../../types/form/formDropdown";
import FormDropdownItem from "../../../types/form/formDropdownItem";

const Form = ({ inputs, button, onSubmit, validator }: FormModel) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    trigger,
    formState: { isValid, errors },
    resetField,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: validator && zodResolver(validator),
  });

  const [values, setValues] = useState(inputs.map((i) => i.value));

  const handleInputChange = (
    event: any,
    model: FormInputModel,
    index: number
  ) => {
    setValues(values.map((v, i) => (i == index ? event.target.value : v)));
    model.onChange && model.onChange(event);
  };

  const handleSelect = (
    item: FormDropdownItem,
    model: FormDropdown,
    index: number
  ) => {
    setValues(values.map((v, i) => (i == index ? item.value : v)));
    model.onSelect && model.onSelect(item);
  };

  const submitHandler = (data: any) => {
    onSubmit &&
      onSubmit(data, () => {
        setValues(Array.from({ length: inputs.length }, (_, i) => ""));
        reset();
      });
  };

  return (
    <form
      className='card border-0 bg-body p-3'
      onSubmit={handleSubmit(submitHandler)}
    >
      {inputs.map((i, index) =>
        "items" in i ? (
          <Dropdown
            key={index}
            name={i.name}
            label={i.label}
            text={i.text}
            items={i.items}
            value={values[index]}
            color={i.color}
            isRequired={validator && !validator?.shape[i.name].isOptional()}
            isDisabled={i.isDisabled}
            isOutlined={i.containsOutline}
            isAutoClosed={i.isAutoClosed}
            isReferenced={i.hasReference}
            error={errors[i.name]?.message as string | undefined}
            trigger={trigger}
            setValue={setValue}
            doRegister={register}
            onSelect={(item: FormDropdownItem) => handleSelect(item, i, index)}
          />
        ) : (
          <Input
            key={index}
            label={i.label}
            name={i.name}
            type={i.type}
            value={values[index]}
            placeholder={i.text}
            isRequired={validator && !validator?.shape[i.name].isOptional()}
            isDisable={i.isDisabled}
            showCheck={i.containsValidCheck}
            onChange={(e) => handleInputChange(e, i, index)}
            doRegister={register}
            error={errors[i.name]?.message as string | undefined}
          />
        )
      )}

      {button && (
        <Button
          text={button.text}
          color={button.color}
          containsOutline={button.isOutlined}
          disable={!isValid}
          isSubmit={button.canSubmit && isValid}
          onClick={button.onClick}
        >
          {button.children}
        </Button>
      )}
    </form>
  );
};

export default Form;
