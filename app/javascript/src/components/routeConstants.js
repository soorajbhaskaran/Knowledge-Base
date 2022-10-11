import Articles from "components/Dashboard/Articles";
import Create from "components/Dashboard/Articles/NewArticle/Create";
import Edit from "components/Dashboard/Articles/NewArticle/Edit";

export const DASHBOARD_PATH = "/dashboard";
export const ARTICLES_PATH = "/dashboard/articles";
export const SETTINGS_PATH = "/dashboard/settings";
export const NEW_ARTICLE_PATH = "/dashboard/articles/new";
export const EDIT_ARTICLE_PATH = "/dashboard/articles/:slug/edit";

export const DASHBOARD_ROUTES = [
  {
    path: ARTICLES_PATH,
    component: Articles,
  },
  // {
  //   path: SETTINGS_PATH,
  //   component: Settings,
  // },

  {
    path: NEW_ARTICLE_PATH,
    component: Create,
  },
  {
    path: EDIT_ARTICLE_PATH,
    component: Edit,
  },
];
