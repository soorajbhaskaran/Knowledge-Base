import React from "react";

import { Table as NeetoUITable } from "neetoui";
import { useHistory } from "react-router-dom";

import articleApi from "apis/articles";

import { buildArticleColumnData } from "./utils";

const Table = ({ articles, refetch }) => {
  const history = useHistory();
  const handleEditButton = (slug) => {
    history.push(`/dashboard/articles/${slug}/edit`);
  };
  const handleDeleteButton = async (slug) => {
    try {
      await articleApi.destroy(slug);
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
      })}
      onRowClick={() => {}}
      onRowSelect={() => {}}
    />
  );
};

export default Table;
