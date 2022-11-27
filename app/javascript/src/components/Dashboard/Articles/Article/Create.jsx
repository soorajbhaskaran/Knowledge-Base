import React from "react";

import { withRouter } from "react-router-dom";

import articlesApi from "apis/articles";

import Article from "./Article";
import Form from "./Form";

import { ARTICLES_INITIAL_FORM_VALUES } from "../constants";

const Create = ({ history }) => {
  const handleCreateArticle = async (values, status) => {
    try {
      await articlesApi.create({
        ...values,
        category_id: values.category.value,
        status,
      });
      history.push("/admin/articles");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Article isEdit={false}>
      <Form
        handleSubmit={handleCreateArticle}
        initialArticleValue={ARTICLES_INITIAL_FORM_VALUES}
        isEdit={false}
      />
    </Article>
  );
};

export default withRouter(Create);
