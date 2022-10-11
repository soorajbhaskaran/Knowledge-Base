import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";

import articleApi from "apis/articles";

import Form from "./Form";

const Edit = () => {
  const [article, setArticle] = useState({});
  const { slug } = useParams();
  const history = useHistory();

  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await articleApi.show(slug);
      setArticle({
        title: article.title,
        content: article.content,
        category: { label: article.category.title, value: article.category.id },
      });
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  const handleEditArticle = async (values, status) => {
    try {
      await articleApi.update(slug, {
        ...values,
        category_id: values.category.value,
        status,
      });
      history.push("/dashboard/articles");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Form
      isEdit
      handleSubmit={handleEditArticle}
      initialArticleValue={article}
    />
  );
};

export default Edit;
