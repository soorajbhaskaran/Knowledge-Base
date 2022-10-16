import React from "react";

import { Accordion as NeetoUIAccordion } from "neetoui";
import PropTypes from "prop-types";
import { useParams, NavLink } from "react-router-dom";

const Accordion = ({ categories }) => {
  const { slug } = useParams();

  const isAccordionOpen = (articles) =>
    articles.some((article) => article.slug === slug);

  return (
    <NeetoUIAccordion className="mx-8 w-1/4 border-r-2" defaultActiveKey={0}>
      {categories.map(({ id, articles, title }) => (
        <NeetoUIAccordion.Item
          isOpen={isAccordionOpen(articles)}
          key={id}
          title={title}
        >
          {articles.map(({ id, title, slug }) => (
            <NavLink
              exact
              activeClassName="text-indigo-700"
              className="mr-3 block px-1 pt-1 text-sm  leading-5 text-gray-500 active:text-indigo-700"
              key={id}
              to={`/article/${slug}`}
            >
              {title}
            </NavLink>
          ))}
        </NeetoUIAccordion.Item>
      ))}
    </NeetoUIAccordion>
  );
};

Accordion.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default Accordion;
