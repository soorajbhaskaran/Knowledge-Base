import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";
import queryString from "query-string";
import { useLocation, withRouter } from "react-router-dom";

import articlesApi from "apis/articles";
import EmptyState from "components/Common/EmptyState";
import EmptyArticleList from "images/EmptyArticleList";

import Header from "./Header";
import MenuBar from "./Menu";
import Table from "./Table";
import { buildArticleStatusTabsWithCount } from "./utils";

const Articles = ({ history }) => {
  const [checkedColumns, setCheckedColumns] = useState({
    title: true,
    category: true,
    author: true,
    date: true,
    status: true,
  });
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [articleStatusTabs, setArticleStatusTabs] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const location = useLocation();
  const { status } = queryString.parse(location.search);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch({ status });
      setArticles(articles);
      setArticleStatusTabs(buildArticleStatusTabsWithCount(articles));
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="relative z-0 flex items-start">
      <MenuBar
        articleStatusTabs={articleStatusTabs}
        categoryList={categoryList}
        fetchArticles={fetchArticles}
        setArticles={setArticles}
        setCategoryList={setCategoryList}
        setLoading={setLoading}
      />
      <Container>
        <Header
          categoryList={categoryList}
          checkedColumns={checkedColumns}
          fetchArticles={fetchArticles}
          setArticles={setArticles}
          setCheckedColumns={setCheckedColumns}
        />
        {articles.length > 0 ? (
          <>
            <Typography component="h1" style="body1" weight="semibold">
              {articles.length}
              {articles.length > 1 ? " Articles" : " Article"}
            </Typography>
            <hr className="h-4" />
            <Table
              articles={articles}
              checkedColumns={checkedColumns}
              refetch={fetchArticles}
            />
          </>
        ) : (
          <EmptyState
            image={EmptyArticleList}
            primaryAction={() => history.push("/admin/articles/new")}
            primaryActionLabel="Add new article"
            subtitle="Add your first article to send out to your customers"
            title="Looks like you don't have any articles!"
          />
        )}
      </Container>
    </div>
  );
};

export default withRouter(Articles);
