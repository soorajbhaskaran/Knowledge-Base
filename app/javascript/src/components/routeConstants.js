import Articles from "components/Dashboard/Articles";

export const DASHBOARD_PATH = "/";
export const ARTICLES_PATH = "/articles";
export const SETTINGS_PATH = "/settings";

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
