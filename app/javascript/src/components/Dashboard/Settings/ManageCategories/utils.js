import dayjs from "dayjs";

const formatDateRelativeToNow = (dateTime) => dayjs(dateTime).fromNow();
const formatDateWithDayAndTime = (dateTime) =>
  dayjs(dateTime).format(`dddd MMMM DD, YYYY hh:mm A`);

export { formatDateRelativeToNow, formatDateWithDayAndTime };

export const getArticlesOrderedByPosition = (articles) => {
  let articlesList = articles.published.map((article) => article);
  articlesList = articlesList.concat(articles.draft.map((article) => article));

  return articlesList.sort((a, b) => a.position - b.position);
};

export const getCategoriesTitleFromCategories = (categories) =>
  categories.map((category) => ({ id: category.id, title: category.title }));
