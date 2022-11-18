import React from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import articlesApi from "apis/articles";

import Article from "./Article";

const DragAndDrop = ({
  articles,
  setArticles,
  fetchCategories,
  userName,
  category,
}) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;

    const items = Array.from(articles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    sortArticles(items);
    setArticles(items);
  };

  const sortArticles = async (articles) => {
    try {
      await articlesApi.sort({ articles });
      fetchCategories({ isFirstFetch: false });
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="articles">
        {(provided) => (
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
                  {(provided) => (
                    <Article
                      category={category}
                      content={content}
                      createdAt={created_at}
                      id={id}
                      innerRef={provided.innerRef}
                      key={id}
                      provided={provided}
                      publishedDate={published_date}
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

DragAndDrop.propTypes = {};

export default DragAndDrop;
