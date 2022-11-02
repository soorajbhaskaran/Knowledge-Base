import React from "react";

import { Check } from "neetoicons";
import { Input as NeetoUIInput, Button } from "neetoui";
import PropTypes from "prop-types";

import categoryApi from "apis/categories";

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
      } = await categoryApi.search(title);
      setSearchFieldText(title);
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setShowSearchInput(false);
      setSearchFieldText("");
    }
  };

  const handleKeyUp = (e, setState) => {
    if (e.key === "Escape") {
      setState(false);
      setSearchFieldText("");
    }
  };

  const handleBlur = (setState) => {
    setState(false);
  };

  const handleSubmit = () => {
    createCategory();
    setShowAddInput(false);
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
            onKeyUp={(e) => handleKeyUp(e, setShowSearchInput)}
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
            onKeyUp={(e) => handleKeyUp(e, setShowAddInput)}
          />
          <Button icon={Check} style="text" onClick={handleSubmit} />
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
