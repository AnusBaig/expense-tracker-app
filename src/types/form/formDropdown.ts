import { ColorType } from "../colorType";
import FormDropdownItem from "./formDropdownItem";

export default interface FormDropdown {
  name: string;
  label: string;
  text: string;
  items: FormDropdownItem[];
  value?: string;
  error?: string;
  color?: ColorType;
  isDisabled?: boolean;
  containsOutline?: boolean;
  hasReference?: boolean;
  isAutoClosed?: boolean;
  onSelect?: (item: FormDropdownItem) => void;
}
