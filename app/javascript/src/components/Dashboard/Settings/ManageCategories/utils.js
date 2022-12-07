import dayjs from "dayjs";

const formatDateRelativeToNow = (dateTime) => dayjs(dateTime).fromNow();
const formatDateWithDayAndTime = (dateTime) =>
  dayjs(dateTime).format(`dddd MMMM DD, YYYY hh:mm A`);

export { formatDateRelativeToNow, formatDateWithDayAndTime };

export const getArticlesOrderedByPosition = (articles) => {
  let articleList = articles.published.map((article) => article);
  articleList = articleList.concat(articles.draft.map((article) => article));

  return articleList.sort((a, b) => a.position - b.position);
};

export const getCategoriesTitleFromCategories = ({
  categories,
  selectedCategoryId,
}) => {
  const filteredCategories = categories.filter(
    (category) => category.id !== selectedCategoryId
  );

  return filteredCategories.map(({ id, title }) => ({ id, title }));
};
