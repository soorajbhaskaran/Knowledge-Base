import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import { Button, Typography, Dropdown, Checkbox, PageLoader } from "neetoui";
import { Header, Container } from "neetoui/layouts";

import articleApi from "apis/articles";

import MenuBar from "./Menu";
import Table from "./Table";

const { Menu, MenuItem } = Dropdown;

const Articles = () => {
  const [checkedColumns, setCheckedColumns] = useState({
    title: true,
    categories: true,
    author: true,
    date: true,
    status: true,
  });
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const {
        data: { articles },
      } = await articleApi.fetch();
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="relative z-0 flex items-start">
      <MenuBar />
      <Container>
        <Header
          actionBlock={
            <>
              <Dropdown
                buttonStyle="secondary"
                closeOnSelect={false}
                label="Columns"
              >
                {renderColumnActionDropdown({
                  checkedColumns,
                  setCheckedColumns,
                })}
              </Dropdown>
              <Button
                icon={Plus}
                iconPosition="right"
                label="Add New Article"
              />
            </>
          }
          searchProps={{
            onChange: () => {},
            placeholder: "Search article title",
            value: "",
          }}
        />
        <Typography component="h1" style="body1" weight="semibold">
          {articles.length} Articles
        </Typography>
        <hr className="h-4" />
        <Table articles={articles} />
      </Container>
    </div>
  );
};

const renderColumnActionDropdown = ({ checkedColumns, setCheckedColumns }) => {
  const articleTableHeaderNames = [
    "Title",
    "Categories",
    "Author",
    "Date",
    "Status",
  ];

  return (
    <Menu>
      {articleTableHeaderNames.map((name, idx) => (
        <MenuItem.Button key={idx}>
          <Checkbox
            checked={checkedColumns[name.toLowerCase()]}
            id={name.toLowerCase()}
            label={name}
            onChange={() => {
              setCheckedColumns((previousCheckedColumns) => ({
                ...previousCheckedColumns,
                [name.toLowerCase()]: !checkedColumns[name.toLowerCase()],
              }));
            }}
          />
        </MenuItem.Button>
      ))}
    </Menu>
  );
};

export default Articles;
