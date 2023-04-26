import { UseFormRegister } from "react-hook-form";

export default interface FormInput {
  name: string;
  type?: string;
  label: string;
  value?: string;
  text?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  containsValidCheck?: boolean;
  onChange?: (e: any) => void;
}
