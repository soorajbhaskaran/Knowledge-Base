import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import queryString from "query-string";
import { buildSelectOptions } from "utils";

import articlesApi from "apis/articles";

import Form from "./Form";

const Edit = ({ location, history }) => {
  const [article, setArticle] = useState({});
  const { status } = queryString.parse(location.search);
  const { id } = location.state;

  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await articlesApi.show({ id, path: "/articles/" });
      setArticle({
        id: article.id,
        slug: article.slug || "",
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
  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <Form
      isEdit
      currentStatus={status}
      handleSubmit={handleEditArticle}
      initialArticleValue={article}
      newStatus={status === "published" ? "draft" : "published"}
    />
  );
};
Edit.propTypes = {
  location: PropTypes.object,
};

export default Edit;
