import Articles from "components/Dashboard/Articles";
import Create from "components/Dashboard/Articles/NewArticle/Create";
import Edit from "components/Dashboard/Articles/NewArticle/Edit";
import Settings from "components/Dashboard/Settings";

export const DASHBOARD_PATH = "/admin";
export const ARTICLES_PATH = "/admin/articles";
export const SETTINGS_PATH = "/admin/settings";
export const NEW_ARTICLE_PATH = "/admin/articles/new";
export const EDIT_ARTICLE_PATH = "/admin/articles/:identifier/edit";
export const EUI_PATH = "/public/articles/";
export const EUI_ARTICLE_PATH = "/public/articles/:slug";
export const AUTH_PATH = "/public/articles/authenticate";
export const INVALID_PATH = "/public/articles/invalid";

export const DASHBOARD_ROUTES = [
  {
    path: ARTICLES_PATH,
    component: Articles,
  },
  {
    path: SETTINGS_PATH,
    component: Settings,
  },
  {
    path: NEW_ARTICLE_PATH,
    component: Create,
  },
  {
    path: EDIT_ARTICLE_PATH,
    component: Edit,
  },
];
