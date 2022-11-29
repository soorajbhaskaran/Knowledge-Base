import React, { useState, useEffect } from "react";

import { useKeyPress, useDebounce } from "hooks";
import { Search } from "neetoicons";
import { Input, Typography } from "neetoui";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import articlesApi from "apis/public/articles";
import Backdrop from "components/Common/Backdrop";

import Card from "./Card";

const Searchbar = ({ showModal, setShowModal, history }) => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const escapePress = useKeyPress("Escape");

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch({ query: searchTerm });
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleArticleClick = (article) => {
    setShowModal(false);
    setCursor(0);
    setSearchTerm("");
    fetchArticles();
    history.push(`/public/articles/${article.slug}`);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 38 || event.keyCode === 40) event.target.blur();
  };

  useEffect(() => {
    if (articles.length > 0 && downPress) {
      setCursor((prevState) =>
        prevState < articles.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);

  useEffect(() => {
    if (articles.length > 0 && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  useEffect(() => {
    if (articles.length > 0 && enterPress) handleArticleClick(articles[cursor]);
  }, [enterPress]);

  useEffect(() => {
    if (articles.length > 0 && hovered) setCursor(articles.indexOf(hovered));
  }, [hovered]);

  useEffect(() => {
    setShowModal(false);
    setCursor(0);
  }, [escapePress]);

  useEffect(() => {
    fetchArticles();
  }, []);

  useDebounce(searchTerm, fetchArticles);

  return (
    <Backdrop setShowModal={setShowModal} showModal={showModal}>
      <Input
        autoFocus
        className="mt-56 rounded-none text-lg font-black"
        placeholder="Search for article"
        prefix={<Search size={25} />}
        size="large"
        style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
      />
      <div className="mt-2 items-center justify-center rounded-sm bg-white py-2">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <Card
              active={index === cursor}
              article={article}
              handleArticleClick={() => handleArticleClick(article)}
              key={article.id}
              setHovered={setHovered}
            />
          ))
        ) : (
          <Typography component="h4" style="h4">
            No matching article found!
          </Typography>
        )}
      </div>
    </Backdrop>
  );
};
Searchbar.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
};

export default withRouter(Searchbar);