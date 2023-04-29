import { ZodObject } from "zod";
import FormButton from "./formButton";
import FormInput from "./formInput";
import FormDropDown from "./formDropdown";

export default interface Form {
  heading?: string;
  inputs: (FormInput | FormDropDown)[];
  button?: FormButton;
  onSubmit?: (formData: any, callback?: () => void) => void;
  validator?: ZodObject<any>;
  noSpacing?: boolean;
}
