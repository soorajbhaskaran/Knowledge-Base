import React, { useState, useEffect, useRef } from "react";

import { Typography, PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";
import queryString from "query-string";
import { useLocation, withRouter } from "react-router-dom";

import articlesApi from "apis/articles";
import EmptyState from "components/Common/EmptyState";
import { useCountDispatch } from "contexts/count";
import EmptyArticleList from "images/EmptyArticleList";

import Header from "./Header";
import MenuBar from "./Menu";
import Table from "./Table";
import {
  buildArticleStatusTabsWithCount,
  getArticlesCountFromStatus,
} from "./utils";

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
  const [pageNo, setPageNo] = useState(1);
  const location = useLocation();
  const dispatch = useCountDispatch();
  const { status } = queryString.parse(location.search);

  const fetchArticles = async (page = 1) => {
    setLoading(true);
    try {
      const {
        data: { articles, published_articles, draft_articles },
      } = await articlesApi.fetch({ status, page });
      setArticles(articles);

      return [published_articles, draft_articles];
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }

    return [0, 0];
  };

  const loadArticles = async () => {
    const [publishedArticles, draftArticles] = await fetchArticles();
    dispatch({
      type: "SET_COUNT",
      count: publishedArticles + draftArticles,
    });
    setArticleStatusTabs(
      buildArticleStatusTabsWithCount(publishedArticles, draftArticles)
    );
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      dispatch({
        type: "SET_COUNT",
        count: getArticlesCountFromStatus(articleStatusTabs, status),
      });
    } else {
      isMounted.current = true;
    }
  }, [status]);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex w-full ">
      <MenuBar
        articleStatusTabs={articleStatusTabs}
        categoryList={categoryList}
        fetchArticles={fetchArticles}
        setArticles={setArticles}
        setCategoryList={setCategoryList}
        setLoading={setLoading}
        setPageNo={setPageNo}
      />
      <Container>
        <Header
          categoryList={categoryList}
          checkedColumns={checkedColumns}
          pageNo={pageNo}
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
              pageNo={pageNo}
              refetch={fetchArticles}
              setPageNo={setPageNo}
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
