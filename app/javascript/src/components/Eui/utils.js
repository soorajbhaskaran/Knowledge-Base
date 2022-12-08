export const getFirstPublishedArticleFromCategories = categories => {
  const firstCategoryWithPublishedArticles = categories.find(
    category => category.articles.published.length > 0
  );

  return firstCategoryWithPublishedArticles.articles.published[0];
};

export const formatCategoriesWithTitleAndArticles = categories =>
  categories.map(({ id, title, articles }) => ({ id, title, articles }));
