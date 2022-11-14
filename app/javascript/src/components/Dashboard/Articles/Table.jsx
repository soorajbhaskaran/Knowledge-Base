import React from "react";

import { Table as NeetoUITable } from "neetoui";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import articlesApi from "apis/articles";

import { buildArticleColumnData } from "./utils";

const Table = ({ articles, refetch, checkedColumns, history }) => {
  const handleEditButton = (identifier, status, id) => {
    history.push({
      pathname: `/admin/articles/${identifier}/edit`,
      search: `?status=${status}`,
      state: { id },
    });
  };
  const handleDeleteButton = async (id) => {
    try {
      await articlesApi.destroy(id);
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

export default withRouter(Table);
