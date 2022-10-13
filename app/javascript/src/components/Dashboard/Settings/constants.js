import * as yup from "yup";

import General from "./General";
import ManageCategories from "./ManageCategories/ManageCategories";
import Redirection from "./Redirection";

export const SETTINGS_NAVLINKS = [
  {
    key: "general",
    label: "General",
    description: "Page title,brand name & Meta description",
    path: "/dashboard/settings?tab=general",
    component: General,
  },
  {
    key: "redirection",
    label: "Redirection",
    description: "Create and configure redirection rules",
    path: "/dashboard/settings?tab=redirection",
    component: Redirection,
  },
  {
    key: "manage-categories",
    label: "Manage Categories",
    description: "Edit and reorder KB structure",
    path: "/dashboard/settings?tab=manage-categories",
    component: ManageCategories,
  },
];

export const KNOWLEDGE_BASE_INITIAL_FORM_VALUES = {
  site: "",
  password: "",
};

export const KNOWLEDGE_BASE_VALIDATION_SCHEMA = yup.object().shape({
  site: yup.string().required("Site name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(
      /([a-z]+[0-9]+)|([0-9]+[a-z]+)/gi,
      "Password should contain atleast one letter and number"
    ),
});
