import React from "react";

import { insert } from "ramda";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import articlesApi from "apis/articles";

import Article from "./Article";

const DragAndDrop = ({
  articles,
  setArticles,
  fetchCategories,
  userName,
  selectedCategory,
  checkedArticles,
  setCheckedArticles,
}) => {
  const handleOnDragEnd = result => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;

    const items = Array.from(articles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    sortArticles(items);
    setArticles(items);
  };

  const sortArticles = async articles => {
    try {
      await articlesApi.sort({ articles });
      fetchCategories({ isFirstFetch: false });
    } catch (error) {
      logger.error(error);
    }
  };

  const handleCheckedColumn = id => {
    if (checkedArticles.includes(id)) {
      setCheckedArticles(checkedArticles.filter(item => item !== id));
    } else {
      setCheckedArticles(insert(checkedArticles.length, id));
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="articles">
        {provided => (
          <div
            {...provided.droppableProps}
            className="w-full"
            ref={provided.innerRef}
          >
            {articles.map(
              (
                { id, status, content, title, created_at, published_date },
                index
              ) => (
                <Draggable draggableId={id} index={index} key={id}>
                  {provided => (
                    <Article
                      checkedArticles={checkedArticles}
                      content={content}
                      createdAt={created_at}
                      handleCheckedColumn={handleCheckedColumn}
                      id={id}
                      innerRef={provided.innerRef}
                      key={id}
                      provided={provided}
                      publishedDate={published_date}
                      selectedCategory={selectedCategory}
                      status={status}
                      title={title}
                      userName={userName}
                    />
                  )}
                </Draggable>
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDrop;
