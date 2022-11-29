import React from "react";

import { useDebounce } from "hooks";
import { Check, Search } from "neetoicons";
import { Input as NeetoUIInput, Button } from "neetoui";
import PropTypes from "prop-types";

import categoriesApi from "apis/categories";

const Input = ({
  searchFieldText,
  fetchCategories,
  setSearchFieldText,
  setCategories,
  showAddInput,
  setShowAddInput,
  showSearchInput,
  toggleSearch,
  toggleAdd,
  title,
  setTitle,
}) => {
  const getCategoriesSearch = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch({ query: searchFieldText });
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const createCategory = async () => {
    try {
      await categoriesApi.create({ title });
      fetchCategories();
      setTitle("");
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = () => {
    createCategory();
    setShowAddInput(false);
    setSearchFieldText("");
  };

  useDebounce(searchFieldText, getCategoriesSearch);

  return (
    <>
      {showSearchInput && (
        <div className="my-3">
          <NeetoUIInput
            autoFocus
            placeholder="Search Category"
            prefix={<Search size={16} />}
            type="search"
            value={searchFieldText}
            onBlur={toggleSearch}
            onChange={(e) => setSearchFieldText(e.target.value)}
          />
        </div>
      )}
      {showAddInput && (
        <div className="my-3 flex justify-between">
          <NeetoUIInput
            autoFocus
            placeholder="Add New Category"
            value={title}
            onBlur={toggleAdd}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            className="ml-2"
            icon={Check}
            style="text"
            onMouseDown={handleSubmit}
          />
        </div>
      )}
    </>
  );
};

Input.propTypes = {
  searchFieldText: PropTypes.string,
  fetchCategories: PropTypes.func,
  setSearchFieldText: PropTypes.func,
  setCategories: PropTypes.func,
  showAddInput: PropTypes.bool,
  setShowAddInput: PropTypes.func,
  showSearchInput: PropTypes.bool,
  title: PropTypes.string,
  setTitle: PropTypes.func,
  toggleSearch: PropTypes.func,
  toggleAdd: PropTypes.func,
};

export default Input;
