import React from "react";

import { Accordion as NeetoUIAccordion } from "neetoui";
import { NavLink } from "react-router-dom";

const Accordion = ({ categories }) => (
  <NeetoUIAccordion className="mx-8 w-1/4 border-r-2" defaultActiveKey={0}>
    {categories.map(({ id, articles, title }) => (
      <NeetoUIAccordion.Item key={id} title={title}>
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

Accordion.propTypes = {};

export default Accordion;
