import React from "react";

import { Search } from "neetoicons";
import { Typography, Dropdown, Input } from "neetoui";
import { Header, Container } from "neetoui/layouts";

import Article from "./Article";

const { Menu, MenuItem } = Dropdown;
const members = ["All", "Draft", "Published", "Archived"];

const Articles = ({ articles }) => (
  <Container>
    <Header
      title="Manage Articles"
      actionBlock={
        <Dropdown buttonStyle="secondary" closeOnSelect={false} label="Move to">
          <div className="flex flex-col gap-y-1 rounded-md p-2">
            <Input placeholder="Search categories" prefix={<Search />} />
            <Typography style="body3">Results</Typography>
            <Menu className="flex flex-col gap-y-1">
              {members.map((item, idx) => (
                <MenuItem.Button key={idx}>{item}</MenuItem.Button>
              ))}
            </Menu>
          </div>
        </Dropdown>
      }
    />
    <Typography className="mb-4 bg-gray-200 p-2" component="p" style="body3">
      You can reorder category or articles based on drag and drop here. You can
      also multi-select articles and move them to another category that you have
      created.{" "}
      <span
        className="cursor-pointer"
        onClick={() => {
          alert("Hello world");
        }}
      >
        <u>Don't show this info again.</u>
      </span>
    </Typography>
    {articles.map(({ id, status, content, title }) => (
      <Article content={content} key={id} status={status} title={title} />
    ))}
  </Container>
);

Articles.propTypes = {};

export default Articles;
