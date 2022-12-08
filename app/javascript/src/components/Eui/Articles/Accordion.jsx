import React from "react";

import { Accordion as NeetoUIAccordion } from "neetoui";
import { useParams, NavLink } from "react-router-dom";

const DEFAULT_SELECTED_CATEGORY_INDEX = 0;
const Accordion = ({ categories }) => {
  const { slug } = useParams();

  const getActiveCategoryIndexFromSlug = categories => {
    const activeCategoryIndex = categories.findIndex(({ articles }) =>
      articles.find(article => article.slug === slug)
    );

    return activeCategoryIndex === -1
      ? DEFAULT_SELECTED_CATEGORY_INDEX
      : activeCategoryIndex;
  };

  return (
    <NeetoUIAccordion
      className="col mr-8 w-1/4 border-r-2 pl-2 font-bold"
      defaultActiveKey={getActiveCategoryIndexFromSlug(categories)}
      style="secondary"
    >
      {categories.map(({ id, articles, title }) => (
        <NeetoUIAccordion.Item key={id} title={title}>
          {articles.map(({ id, title, slug }) => (
            <NavLink
              exact
              activeClassName="text-indigo-700"
              className="mr-3 block px-1 pt-1 text-sm leading-5 text-gray-500 active:text-indigo-700"
              key={id}
              to={`/public/articles/${slug}`}
            >
              {title}
            </NavLink>
          ))}
        </NeetoUIAccordion.Item>
      ))}
    </NeetoUIAccordion>
  );
};

export default Accordion;
