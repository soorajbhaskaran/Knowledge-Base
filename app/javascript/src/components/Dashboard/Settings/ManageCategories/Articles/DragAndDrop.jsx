import React from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import articlesApi from "apis/articles";

const DragAndDrop = ({
  articles,
  setArticles,
  fetchCategories,
  checkedArticles,
  setCheckedArticles,
  children,
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
      setCheckedArticles([...checkedArticles, id]);
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
            {articles.map((article, index) => (
              <Draggable
                draggableId={article.id}
                index={index}
                key={article.id}
              >
                {provided =>
                  children({
                    article,
                    provided,
                    handleCheckedColumn,
                  })
                }
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDrop;
