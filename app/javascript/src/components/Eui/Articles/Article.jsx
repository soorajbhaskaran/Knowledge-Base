import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";
import { assoc } from "ramda";
import { useParams, withRouter } from "react-router-dom";

import articlesApi from "apis/public/articles";

const Article = ({ history }) => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  const fetchArticle = async ({ slug }) => {
    try {
      const {
        data: { article },
      } = await articlesApi.show({ slug });
      setArticle(assoc("category", article.category.title, article));
      localStorage.removeItem("articleSlug");
    } catch (error) {
      logger.error(error);
      history.push("/public/articles/invalid");
    } finally {
      setLoading(false);
    }
  };

  const loadArticle = () => {
    const articleSlug = localStorage.getItem("articleSlug");
    if (articleSlug) {
      history.push(`/public/articles/${articleSlug}`);
      fetchArticle({ slug: articleSlug });
    } else {
      fetchArticle({ slug });
    }
  };

  useEffect(() => {
    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen w-full ">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mt-4 w-3/4">
      <Typography
        className="mb-4 text-3xl font-bold text-gray-800"
        component="h2"
        style="h2"
      >
        {article.title}
      </Typography>
      <div className="flex items-center">
        <Typography className="border rounded-lg border-blue-400 bg-blue-200 p-1 font-bold">
          {article.category}
        </Typography>
        <Typography className="ml-4 text-gray-600" component="h4" style="h4">
          {new Date(article.published_date).toDateString()}
        </Typography>
      </div>
      <Typography
        className="mt-10 pr-16 leading-7 "
        component="p"
        style="body1"
      >
        {article.content}
      </Typography>
    </div>
  );
};

export default withRouter(Article);
