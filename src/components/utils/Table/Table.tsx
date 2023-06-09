import React, { Children, ReactNode } from "react";
import styles from "./Table.module.css";
import TableHeadItem from "../../../types/table/tableHeadItem";
import TableColumnItem from "../../../types/table/tableColumnItem";
import Button from "../Form/Button/Button";

interface Props {
  cols: TableHeadItem[];
  rows: Array<TableColumnItem[]>;
  heading?: string;
  noDataMessage?: string;
  isBordered?: boolean;
  noSpacing?: boolean;
  children?: ReactNode[];
}

const Table = ({
  cols,
  rows,
  heading,
  noDataMessage,
  isBordered,
  noSpacing,
  children,
}: Props) => {
  const getColumnClass = (c: TableHeadItem) =>
    `${c.bold ? "fw-bold" : "fw-normal"} ${
      c.color ? `text-${c.color}` : "text-reset"
    }  ${c.isAction ? "text-start" : ""} 
    ${c.isAction ? "text-start" : ""}`;

  const handleClick = (item: TableColumnItem) => {
    item.onClick && item.onClick();
  };

  const noDataText =
    "Oops! It seems like this table is currently empty. Nothing to display";

  return (
    <>
      <div className={noSpacing ? "m-0" : "m-3"}>
        {heading && (
          <h6 className='display-5 fw-bold text-capitalize text-center pb-3'>
            {heading}
          </h6>
        )}
        {children && children.map((c) => c && c)}
        {rows.length == 0 ? (
          <p className='lead'>{noDataMessage || noDataText}</p>
        ) : (
          <table
            className={`table table-hover ${isBordered && "table-bordered"}`}
          >
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
                          <span onClick={() => handleClick(row[ci])}>
                            {row[ci].text}
                          </span>
                        ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Table;
