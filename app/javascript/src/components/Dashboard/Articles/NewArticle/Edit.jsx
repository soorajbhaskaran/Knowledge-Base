import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import queryString from "query-string";
import { useParams, useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import { buildSelectOptions } from "utils/";

import Form from "./Form";

const Edit = ({ location }) => {
  const [article, setArticle] = useState({});
  const { identifier } = useParams();
  const { status } = queryString.parse(location.search);
  const history = useHistory();

  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await articlesApi.show({ identifier, path: "/articles/", status });
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
    let { slug } = article;

    if (status === "published" && slug === "") {
      slug = article.id;
    }
    try {
      await articlesApi.update(status === "draft" ? article.id : slug, status, {
        ...values,
        category_id: values.category.value,
        slug: article.slug,
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
