import React, { useState, useEffect } from "react";

import { Search, Plus, Check } from "neetoicons";
import { Typography, Tooltip, Input, Button } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import categoryApi from "apis/categories";

const Menu = () => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [searchFieldText, setSearchFieldText] = useState("");

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoryApi.fetch({ path: "/categories" });
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const createCategory = async () => {
    try {
      await categoryApi.create({ title: searchFieldText });
      fetchCategories();
      setSearchFieldText("");
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSearch = (value) => {
    setIsSearchCollapsed((isSearchCollapsed) => !isSearchCollapsed);
    setSearchItem(value);
  };

  const handleSubmit = (value) => {
    if (value === "add") createCategory();
    setIsSearchCollapsed(true);
  };

  const handleSearchChange = async (title) => {
    try {
      const {
        data: { categories },
      } = await categoryApi.search(title);
      setSearchFieldText(title);
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <MenuBar showMenu title="Articles">
      <MenuBar.Block active count={13} label="All" />
      <MenuBar.Block count={2} label="Draft" />
      <MenuBar.Block count={7} label="Published" />
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: () => (
              <Tooltip content="Search for category" position="bottom">
                <Search size={16} />
              </Tooltip>
            ),
            onClick: () => handleSearch("search"),
          },
          {
            icon: () => (
              <Tooltip content="Add new category" position="bottom">
                <Plus size={16} />
              </Tooltip>
            ),
            onClick: () => handleSearch("add"),
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          Categories
        </Typography>
      </MenuBar.SubTitle>
      {!isSearchCollapsed && (
        <div className="my-3 flex justify-between">
          <Input
            type="search"
            value={searchFieldText}
            placeholder={
              searchItem === "search" ? "Search Category" : "Add Category"
            }
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {searchItem === "add" && (
            <Button
              icon={Check}
              style="text"
              onClick={() => handleSubmit(searchItem)}
            />
          )}
        </div>
      )}
      {categories.map(({ title, articles_count }, idx) => (
        <MenuBar.Block count={articles_count} key={idx} label={title} />
      ))}
    </MenuBar>
  );
};
export default Menu;
