import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { isNil } from "ramda";
import { useQuery, useMutation, useQueryClient } from "reactquery";

import articlesApi from "apis/articles";
import { onError } from "common/error";
import useStatusStore from "stores/status";

import Article from "./Article";
import Form from "./Form";
import Alert from "./Schedules/Alert";

const Edit = ({ location, history }) => {
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState({});
  const { setStatus, resetStatus } = useStatusStore();
  const queryClient = useQueryClient();
  const { id } = location.state;
  const schedules = queryClient.getQueryData(["schedules", id]);

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
    const article = {
      ...values,
      category_id: values.category.value,
      status,
    };
    setArticle(article);
    if (!isNil(schedules?.data?.schedules)) {
      setOpen(true);
    } else {
      updateArticle({ id, payload: article });
    }
  };

  const handleAlertSubmit = () => {
    setOpen(false);
    updateArticle({ id, payload: article });
  };

  useEffect(() => {
    setStatus(articleResponse?.data?.article?.status);

    return () => {
      resetStatus();
    };
  }, [articleResponse]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Article isEdit article={articleResponse?.data?.article} id={id}>
        <Form
          isEdit
          handleSubmit={handleEditArticle}
          initialArticleValue={articleResponse?.data?.article}
        />
      </Article>
      <Alert
        handleAlertSubmit={handleAlertSubmit}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default Edit;
