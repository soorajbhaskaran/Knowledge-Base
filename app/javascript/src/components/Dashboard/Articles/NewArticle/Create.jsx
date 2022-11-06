import React from "react";

import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";

import Form from "./Form";

import { ARTICLES_INITIAL_FORM_VALUES } from "../constants";

const Create = () => {
  const history = useHistory();

  const handleCreateArticle = async (values, status) => {
    try {
      await articlesApi.create({
        article: {
          title: values.title,
          content: values.content,
          category_id: values.category.value,
          status,
        },
      });
      history.push("/admin/articles");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Form
      handleSubmit={handleCreateArticle}
      initialArticleValue={ARTICLES_INITIAL_FORM_VALUES}
      isEdit={false}
    />
  );
};

export default Create;
