import React from "react";

import { Table as NeetoUITable, Pagination } from "neetoui";
import { withRouter } from "react-router-dom";

import articlesApi from "apis/articles";
import { useCountState } from "contexts/count";

import { buildArticleColumnData } from "./utils";

const Table = ({
  articles,
  refetch,
  checkedColumns,
  history,
  pageNo,
  setPageNo,
}) => {
  const { count } = useCountState();

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

  const handlePageChange = (page) => {
    setPageNo(page);
    refetch(page);
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
          count={count}
          navigate={(page) => handlePageChange(page)}
          pageNo={pageNo}
          pageSize={9}
        />
      </div>
    </>
  );
};

export default withRouter(Table);
