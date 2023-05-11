import React, { useState } from "react";
import Form from "./utils/Form/Form";
import FormInput from "../types/form/formInput";
import FormDropdown from "../types/form/formDropdown";
import FormDropdownItem from "../types/form/formDropdownItem";
import FormButton from "../types/form/formButton";
import { ZodObject, z } from "zod";
import Table from "./utils/Table/Table";
import TableColumnItem from "../types/table/tableColumnItem";
import TableHeadItem from "../types/table/tableHeadItem";
import _ from "lodash";
import { Actions } from "../enums/actions";

const ExpenseGenerator = () => {
  const inputValidator = z.object({
    description: z.string().min(5).max(30),
    amount: z.number().min(1).max(1000),
    category: z.string().min(3),
  });

  type FormDataType = z.infer<typeof inputValidator>;

  const [expenses, setExpenses] = useState<FormDataType[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<FormDataType>();
  const [action, setAction] = useState(Actions.ADD);

  const categoryItems: FormDropdownItem[] = [
    {
      text: "Groceries",
      value: "groceries",
    },
    {
      text: "Utilities",
      value: "utilities",
    },
    {
      text: "Entertainment",
      value: "entertainment",
    },
  ];

  const isView = (): boolean => action && action == Actions.VIEW;

  const getFormName = (): string => {
    if (action == Actions.ADD) return "Add New Expense";
    else if (action == Actions.EDIT) return "Edit Your Expense";
    else return "Expense Form";
  };

  const expenseInputs: (FormInput | FormDropdown)[] = [
    {
      name: "description",
      type: "text",
      label: "Description",
      text: "Enter product name",
      value: selectedExpense?.description,
      isRequired: true,
      isDisabled: isView(),
      containsValidCheck: !isView(),
    },
    {
      name: "amount",
      type: "number",
      label: "Amount",
      text: "Enter amount",
      value: selectedExpense?.amount.toString(),
      isRequired: true,
      isDisabled: isView(),
      containsValidCheck: !isView(),
    },
    {
      name: "category",
      items: categoryItems,
      label: "Category",
      text: "Select Category",
      value: selectedExpense?.category,
      isRequired: true,
      isDisabled: isView(),
      isAutoClosed: true,
    },
  ];

  const submitButton: FormButton = {
    text: `${action && _.capitalize(action)} Expense`,
    color: "warning",
    canSubmit: !isView(),
  };

  const tableHeader: TableHeadItem[] = [
    { text: "Name" },
    { text: "Amount" },
    {
      text: "Category",
      bold: true,
    },
    {
      isAction: true,
      color: "warning",
    },
    {
      isAction: true,
      color: "danger",
    },
  ];

  const handleSelectItemForView = (item: FormDataType) => {
    setSelectedExpense(item);
    setAction(Actions.VIEW);
  };

  const handleSelectItemForEdit = (item: FormDataType) => {
    setSelectedExpense(item);
    setAction(Actions.EDIT);
  };

  const handleAdd = (item: FormDataType) => {
    if (expenses.some((e) => e.description == item.description)) {
      console.log(`Expense with description ${item.description} already exist`);
      return;
    }
    setExpenses([...expenses, item]);
    setAction(Actions.ADD);
  };

  const handleEdit = (item: FormDataType) => {
    setExpenses(
      expenses.map((e) => (e.description != item.description ? e : { ...item }))
    );
    setAction(Actions.ADD);
  };

  const handleDelete = (item: FormDataType) => {
    setExpenses(expenses.filter((e) => e.description != item.description));
    setSelectedExpense(undefined);
    setAction(Actions.ADD);
  };

  const handleSubmit = (data: FormDataType, callback?: () => void) => {
    console.log(data);

    if (data) {
      if (action == Actions.ADD) handleAdd(data);
      else if (action == Actions.EDIT) handleEdit(data);
      else {
        console.log(`Operation to ${action} Expense can not be performed`);
        return;
      }

      callback && callback();
      console.log(`Operation to ${action} Expense is performed successfully`);

      setSelectedExpense(undefined);

      expenses && expenses.length > 5
        ? setAction(Actions.NO_ACTION)
        : setAction(Actions.ADD);
    }
  };

  const getListItems = (): Array<TableColumnItem[]> => {
    let rowItems: Array<TableColumnItem[]> = [];

    if (!expenses) return rowItems;

    for (const item of expenses) {
      rowItems.push([
        {
          text: item.description,
          onClick: () => handleSelectItemForView(item),
        },
        {
          text: "$ " + item.amount.toString(),
        },
        {
          text: _.capitalize(item.category),
        },
        {
          text: "Edit",
          onClick: () => handleSelectItemForEdit(item),
        },
        {
          text: "Delete",
          onClick: () => handleDelete(item),
        },
      ]);
    }

    return rowItems;
  };

  return (
    <>
      {(action && action == Actions.NO_ACTION) || (
        <Form
          heading={getFormName()}
          inputs={expenseInputs}
          button={!isView() ? submitButton : undefined}
          validator={inputValidator}
          onSubmit={handleSubmit}
        />
      )}

      <Table
        heading='Monthly Expenses'
        cols={tableHeader}
        rows={getListItems()}
      />
    </>
  );
};

export default ExpenseGenerator;
