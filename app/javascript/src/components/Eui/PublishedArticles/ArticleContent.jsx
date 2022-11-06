import React, { useState, useEffect } from "react";

import { Typography, Callout, PageLoader } from "neetoui";
import { useParams, useHistory } from "react-router-dom";

import articlesApi from "apis/articles";

const ArticleContent = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await articlesApi.show({
        identifier: slug,
        path: "/public/articles/",
        status: "published",
      });
      setArticle({
        ...article,
        category: article.category.title,
      });
    } catch (error) {
      logger.error(error);
      history.push("/articles/invalid");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArticle();
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
        <Typography className="ml-4" component="p" style="body1">
          {new Date(article.published_date).toDateString()}
        </Typography>
      </div>
      <Typography className="mt-10 pr-16 leading-7" component="p" style="body1">
        {article.content}
      </Typography>
    </div>
  );
};

export default ArticleContent;
