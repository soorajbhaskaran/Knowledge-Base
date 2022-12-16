import React, { useEffect } from "react";

import { PageLoader } from "neetoui";
import { useQuery, useMutation } from "reactquery";

import articlesApi from "apis/articles";
import { onError } from "common/error";
import { useStatusDispatch } from "contexts/status";

import Article from "./Article";
import Form from "./Form";

const Edit = ({ location, history }) => {
  const statusDispatch = useStatusDispatch();

  const { id } = location.state;

  const { data: articleResponse, isLoading } = useQuery(
    ["article", id],
    () => articlesApi.show(id),
    {
      onError,
    }
  );

  const { mutate: updateArticle } = useMutation(articlesApi.update, {
    onSuccess: () => {
      history.push("/admin/articles");
    },
    onError,
  });

  const handleEditArticle = (values, status) => {
    const payload = {
      ...values,
      category_id: values.category.value,
      status,
    };

    updateArticle({ id, payload });
  };

  useEffect(() => {
    statusDispatch({
      type: "SET_STATUS",
      status: articleResponse?.data?.article?.status,
    });

    return () => {
      statusDispatch({ type: "RESET_STATUS" });
    };
  }, [articleResponse]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Article isEdit article={articleResponse?.data?.article} id={id}>
      <Form
        isEdit
        handleSubmit={handleEditArticle}
        initialArticleValue={articleResponse?.data?.article}
      />
    </Article>
  );
};

export default Edit;
