import React, { useState, useEffect } from "react";

import { Typography, Callout, PageLoader } from "neetoui";
import { useParams, withRouter } from "react-router-dom";

import articlesApi from "apis/public/articles";

const ArticleContent = ({ history }) => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  const fetchArticle = async ({ slug }) => {
    try {
      const {
        data: { article },
      } = await articlesApi.show({ slug });
      setArticle({
        ...article,
        category: article.category.title,
      });
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
      <Typography className="mb-4 tracking-wider" component="h2" style="h2">
        {article.title}
      </Typography>
      <div className="flex items-center">
        <Callout style="info">{article.category}</Callout>
        <Typography className="ml-4 text-gray-600" component="p" style="body1">
          {new Date(article.published_date).toDateString()}
        </Typography>
      </div>
      <Typography className="mt-10 pr-16 leading-7" component="p" style="body1">
        {article.content}
      </Typography>
    </div>
  );
};

export default withRouter(ArticleContent);
