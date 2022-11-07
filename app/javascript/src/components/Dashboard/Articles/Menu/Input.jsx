import React from "react";

import { Check } from "neetoicons";
import { Input as NeetoUIInput, Button } from "neetoui";
import PropTypes from "prop-types";

import categoriesApi from "apis/categories";

const Input = ({
  searchFieldText,
  createCategory,
  setSearchFieldText,
  setCategories,
  showAddInput,
  setShowAddInput,
  showSearchInput,
  setShowSearchInput,
  title,
  setTitle,
}) => {
  const handleSearch = async (title) => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.search(title);
      setSearchFieldText(title);
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

  const handleBlur = (setState) => {
    setState(false);
  };

  const handleSubmit = () => {
    createCategory();
    setShowAddInput(false);
    setSearchFieldText("");
  };

  return (
    <>
      {showSearchInput && (
        <div className="my-3">
          <NeetoUIInput
            autoFocus
            placeholder="Search Category"
            type="search"
            value={searchFieldText}
            onBlur={() => handleBlur(setShowSearchInput)}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      )}
      {showAddInput && (
        <div className="my-3 flex justify-between">
          <NeetoUIInput
            autoFocus
            placeholder="Add New Category"
            type="search"
            value={title}
            onBlur={() => handleBlur(setShowAddInput)}
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
  createCategory: PropTypes.func,
  setSearchFieldText: PropTypes.func,
  setCategories: PropTypes.func,
  showAddInput: PropTypes.bool,
  setShowAddInput: PropTypes.func,
  showSearchInput: PropTypes.bool,
  setShowSearchInput: PropTypes.func,
  title: PropTypes.string,
  setTitle: PropTypes.func,
};

export default Input;
