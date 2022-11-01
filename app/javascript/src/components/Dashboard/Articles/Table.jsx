import React from "react";

import { Table as NeetoUITable } from "neetoui";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import articleApi from "apis/articles";

import { buildArticleColumnData } from "./utils";

const Table = ({ articles, refetch, checkedColumns }) => {
  const history = useHistory();

  const handleEditButton = (identifier, status) => {
    history.push({
      pathname: `/admin/articles/${identifier}/edit`,
      search: `?status=${status}`,
    });
  };
  const handleDeleteButton = async (identifier, status) => {
    try {
      await articleApi.destroy(identifier, status);
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <NeetoUITable
      currentPageNumber={1}
      defaultPageSize={10}
      rowData={articles}
      columnData={buildArticleColumnData({
        handleEditButton,
        handleDeleteButton,
        checkedColumns,
      })}
      onRowClick={() => {}}
      onRowSelect={() => {}}
    />
  );
};

Table.propTypes = {
  articles: PropTypes.array,
  refetch: PropTypes.func,
  checkedColumns: PropTypes.object,
};

export default Table;
