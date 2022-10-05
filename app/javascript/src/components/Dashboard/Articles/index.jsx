import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Button, Typography, Dropdown, Checkbox } from "neetoui";
import { Header, Container } from "neetoui/layouts";

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
          67 Articles
        </Typography>
        <hr className="h-4" />
        <Table />
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
      {articleTableHeaderNames.map((item, idx) => (
        <MenuItem.Button key={idx}>
          <Checkbox
            checked={checkedColumns[item.toLowerCase()]}
            id={item.toLowerCase()}
            label={item}
            onChange={() => {
              setCheckedColumns({
                ...checkedColumns,
                [item.toLowerCase()]: !checkedColumns[item.toLowerCase()],
              });
            }}
          />
        </MenuItem.Button>
      ))}
    </Menu>
  );
};

export default Articles;
