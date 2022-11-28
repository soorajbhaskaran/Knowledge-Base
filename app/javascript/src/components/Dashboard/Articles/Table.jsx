import React from "react";

import { Table as NeetoUITable, Pagination } from "neetoui";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import articlesApi from "apis/articles";

import { buildArticleColumnData } from "./utils";

const Table = ({
  articles,
  refetch,
  checkedColumns,
  history,
  totalRecords,
}) => {
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
    <>
      <NeetoUITable
        rowData={articles}
        columnData={buildArticleColumnData({
          handleEditButton,
          handleDeleteButton,
          checkedColumns,
        })}
        onRowClick={() => {}}
        onRowSelect={() => {}}
      />
      <div className="relative mt-2 w-full">
        <Pagination
          className="float-right"
          count={totalRecords}
          navigate={function noRefCheck() {}}
          pageNo={1}
          pageSize={9}
        />
      </div>
    </>
  );
};

Table.propTypes = {
  articles: PropTypes.array,
  refetch: PropTypes.func,
  checkedColumns: PropTypes.object,
};

export default withRouter(Table);
