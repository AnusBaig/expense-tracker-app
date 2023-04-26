import { ReactNode } from "react";

export default interface FormButton {
  text: string;
  color?: "primary" | "secondary" | "success" | "danger" | "warning";
  isOutlined?: boolean;
  canSubmit?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}
