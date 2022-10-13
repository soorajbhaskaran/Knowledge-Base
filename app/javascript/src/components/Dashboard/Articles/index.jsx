import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";

import articleApi from "apis/articles";

import Header from "./Header";
import MenuBar from "./Menu";
import Table from "./Table";

const Articles = () => {
  const [checkedColumns, setCheckedColumns] = useState({
    title: true,
    category: true,
    author: true,
    date: true,
    status: true,
  });
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [searchArticle, setSearchArticle] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const {
        data: { articles },
      } = await articleApi.fetch();
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const getFilteredArticles = ({ articles, searchArticle }) =>
    articles.filter(({ title }) =>
      title.toLowerCase().includes(searchArticle.toLowerCase())
    );

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="relative z-0 flex items-start">
      <MenuBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Container>
        <Header
          checkedColumns={checkedColumns}
          searchArticle={searchArticle}
          setCheckedColumns={setCheckedColumns}
          setSearchArticle={setSearchArticle}
        />
        <Typography component="h1" style="body1" weight="semibold">
          {getFilteredArticles({ articles, searchArticle }).length}
          {getFilteredArticles({ articles, searchArticle }).length > 1
            ? " Articles"
            : " Article"}
        </Typography>
        <hr className="h-4" />
        <Table
          articles={getFilteredArticles({ articles, searchArticle })}
          checkedColumns={checkedColumns}
          refetch={fetchArticles}
        />
      </Container>
    </div>
  );
};

export default Articles;
