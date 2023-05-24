import { ColorType } from "../colorType";

export default interface TableHeadItem {
  text?: string;
  isAction?: boolean;
  color?: ColorType;
  bold?: boolean;
}
