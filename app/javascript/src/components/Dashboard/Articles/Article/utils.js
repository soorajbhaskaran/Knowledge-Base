import { assoc } from "ramda";
import { buildSelectOptions } from "utils";

export const updateArticleWithCategory = article =>
  assoc("category", buildSelectOptions([article.category])[0], article);
