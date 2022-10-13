import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";

import articleApi from "apis/articles";
import { buildSelectOptions } from "utils/";

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
        category: { ...buildSelectOptions([article.category])[0] },
      });
    } catch (error) {
      logger.error(error);
    }
  };

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
  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <Form
      isEdit
      handleSubmit={handleEditArticle}
      initialArticleValue={article}
    />
  );
};

export default Edit;
