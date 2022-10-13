export const buildSelectOptions = (categories) =>
  categories.map((category) => ({ label: category.title, value: category.id }));
