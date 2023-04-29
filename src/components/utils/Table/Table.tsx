import React from "react";
import styles from "./Table.module.css";
import TableHeadItem from "../../../types/table/tableHeadItem";
import TableColumnItem from "../../../types/table/tableColumnItem";
import Button from "../Form/Button/Button";

interface Props {
  cols: TableHeadItem[];
  rows: Array<TableColumnItem[]>;
  heading?: string;
  isBordered?: boolean;
  noSpacing?: boolean;
}

const Table = ({ cols, rows, heading, isBordered, noSpacing }: Props) => {
  const getColumnClass = (c: TableHeadItem) =>
    `${c.bold ? "fw-bold" : "fw-normal"} ${
      c.color ? `text-${c.color}` : "text-reset"
    }  ${c.isAction ? "text-start" : ""} 
    ${c.isAction ? "text-start" : ""}`;

  const handleClick = (item: TableColumnItem) => {
    item.onClick && item.onClick();
  };

  return (
    <div className={noSpacing ? "m-0" : "m-3"}>
      {heading && (
        <h6 className='display-5 fw-bold text-capitalize text-center pb-3'>
          {heading}
        </h6>
      )}
      <table className={`table table-hover ${isBordered && "table-bordered"}`}>
        <thead className='bg-light'>
          <tr>
            {cols.map((c, index) => (
              <th key={index} className='text-capitalize' scope='col'>
                {!c.isAction && c.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {cols.map((c, ci) => (
                <td key={ci} className={getColumnClass(c)}>
                  {row[ci] &&
                    (c.isAction ? (
                      <Button
                        text={row[ci].text}
                        color={c.color}
                        size={"sm"}
                        noSpacing={true}
                        onClick={() => handleClick(row[ci])}
                      />
                    ) : row[ci].link ? (
                      <a
                        className={getColumnClass(c)}
                        href={row[ci].link || ""}
                      >
                        {row[ci].text}
                      </a>
                    ) : (
                      row[ci].text
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
