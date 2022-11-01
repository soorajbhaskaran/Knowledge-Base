import { Settings, Repeat, Seo } from "neetoicons";
import * as yup from "yup";

import General from "./General";
import ManageCategories from "./ManageCategories";
import Redirection from "./Redirection";

export const SETTINGS_NAVLINKS = [
  {
    key: "general",
    label: "General",
    icon: Settings,
    description: "Page title,brand name & Meta description",
    path: "/admin/settings?tab=general",
    component: General,
  },
  {
    key: "redirection",
    label: "Redirection",
    icon: Repeat,
    description: "Create and configure redirection rules",
    path: "/admin/settings?tab=redirection",
    component: Redirection,
  },
  {
    key: "manage-categories",
    label: "Manage Categories",
    icon: Seo,
    description: "Edit and reorder KB structure",
    path: "/admin/settings?tab=manage-categories",
    component: ManageCategories,
  },
];

export const KNOWLEDGE_BASE_INITIAL_FORM_VALUES = {
  name: "",
  password: "",
};

export const REDIRECTION_VALIDATION_SCHEMA = yup.object().shape({
  from_path: yup.string().required("From path is required"),
  to_path: yup.string().required("To path is required"),
});

export const ALPHANUMERIC_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
