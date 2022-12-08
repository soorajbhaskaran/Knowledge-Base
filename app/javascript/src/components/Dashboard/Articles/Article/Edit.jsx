import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import queryString from "query-string";
import { assoc } from "ramda";
import { buildSelectOptions } from "utils";

import articlesApi from "apis/articles";
import versionsApi from "apis/versions";
import { useStatusDispatch } from "contexts/status";

import Article from "./Article";
import Form from "./Form";

const Edit = ({ location, history }) => {
  const [article, setArticle] = useState({});
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { status } = queryString.parse(location.search);
  const statusDispatch = useStatusDispatch();

  const { id } = location.state;

  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await articlesApi.show(id);

      setArticle(
        assoc(
          "category",
          { ...buildSelectOptions([article.category])[0] },
          article
        )
      );
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchVersions = async () => {
    try {
      const {
        data: { versions },
      } = await versionsApi.fetch(id);
      setVersions(versions);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleEditArticle = async (values, status) => {
    try {
      await articlesApi.update(id, {
        ...values,
        category_id: values.category.value,
        status,
      });
      history.push("/admin/articles");
    } catch (error) {
      logger.error(error);
    }
  };

  const loadArticle = async () => {
    setLoading(true);
    await Promise.all([fetchArticle(), fetchVersions()]);
    setLoading(false);
  };

  useEffect(() => {
    loadArticle();
  }, []);

  useEffect(() => {
    statusDispatch({ type: "SET_STATUS", status });

    return () => {
      statusDispatch({ type: "RESET_STATUS" });
    };
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Article
      isEdit
      article={article}
      fetchArticle={fetchArticle}
      fetchVersions={fetchVersions}
      versions={versions}
    >
      <Form
        isEdit
        handleSubmit={handleEditArticle}
        initialArticleValue={article}
      />
    </Article>
  );
};

export default Edit;
