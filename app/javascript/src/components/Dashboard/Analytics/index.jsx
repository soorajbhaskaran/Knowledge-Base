import React, { useState, useEffect } from "react";

import { Table, Pagination, PageLoader } from "neetoui";

import articlesApi from "apis/articles";

import { buildAnalyticsColumnData } from "./utils";

const Analytics = () => {
  const [articles, setArticles] = useState([]);
  const [publishedArticlesCount, setPublishedArticlesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const {
        data: { articles, published_articles },
      } = await articlesApi.fetch({ status: "published", page: pageNo });
      setArticles(articles);
      setPublishedArticlesCount(published_articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [pageNo]);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="w-full px-32 pt-10">
      <Table
        className="mx-16"
        columnData={buildAnalyticsColumnData()}
        rowData={articles}
        onRowClick={() => {}}
        onRowSelect={() => {}}
      />
      <div className="relative mt-2 w-full">
        <Pagination
          className="float-right"
          count={publishedArticlesCount}
          navigate={(page) => setPageNo(page)}
          pageNo={pageNo}
          pageSize={9}
        />
      </div>
    </div>
  );
};

export default Analytics;
