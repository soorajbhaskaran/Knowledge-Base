import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildRedirectionColumnData } from "../utils";

const Table = ({ redirection }) => (
  <NeetoUITable
    className="background-red mt-10"
    columnData={buildRedirectionColumnData()}
    currentPageNumber={1}
    defaultPageSize={10}
    rowData={redirection}
    style={{ backgorundColor: "red" }}
    onRowClick={() => {}}
    onRowSelect={() => {}}
  />
);

Table.propTypes = {};

export default Table;
