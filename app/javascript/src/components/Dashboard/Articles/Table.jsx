import React from "react";

import { Table as NeetoUITable } from "neetoui";

// import { CONTACTS } from "./constants";
import { buildArticleColumnData } from "./utils";

const Table = ({ articles }) => (
  <NeetoUITable
    columnData={buildArticleColumnData()}
    currentPageNumber={1}
    defaultPageSize={10}
    rowData={articles}
    onRowClick={() => {}}
    onRowSelect={() => {}}
  />
);

export default Table;
