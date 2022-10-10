import React from "react";

import { useHistory } from "react-router-dom";

import articleApi from "apis/articles";

import Form from "./Form";

import { ARTICLES_INITIAL_FORM_VALUES } from "../constants";

const Create = () => {
  const history = useHistory();

  const handleCreateArticle = async (values, status) => {
    try {
      await articleApi.create({
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
      handleSubmit={handleCreateArticle}
      initialArticleValue={ARTICLES_INITIAL_FORM_VALUES}
      isEdit={false}
    />
  );
};

Create.propTypes = {};

export default Create;
