import Articles from "components/Dashboard/Articles";

export const DASHBOARD_PATH = "/dashboard";
export const ARTICLES_PATH = "/dashboard/articles";
export const SETTINGS_PATH = "/dashboard/settings";
export const NEW_ARTICLE_PATH = "/dashboard/articles/new";
export const EDIT_ARTICLE_PATH = "/dashboard/articles/:id/edit";

export const DASHBOARD_ROUTES = [
  {
    path: ARTICLES_PATH,
    component: Articles,
  },
  // {
  //   path: SETTINGS_PATH,
  //   component: Settings,
  // },
];

export const ARTICLE_ROUTES = [
  {
    path: NEW_ARTICLE_PATH,
  },
  {
    path: EDIT_ARTICLE_PATH,
  },
];
