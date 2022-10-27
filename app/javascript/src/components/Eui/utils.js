export const getFirstPublishedArticleFromCategories = (categories) => {
  const firstCategoryWithPublishedArticles = categories.find(
    (category) => category.articles.published.length > 0
  );

  return firstCategoryWithPublishedArticles.articles.published[0];
};

export const getCategoriesWithOnlyPublishedArticles = (categories) => {
  const publishedCategory = categories.filter(
    (category) => category.articles.published.length > 0
  );

  return publishedCategory.map((category) => ({
    id: category.id,
    title: category.title,
    articles: category.articles.published,
  }));
};
