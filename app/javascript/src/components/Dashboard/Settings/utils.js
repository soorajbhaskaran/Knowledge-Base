import { SETTINGS_NAVLINKS } from "./constants";

export const getActiveNavLink = (key) =>
  SETTINGS_NAVLINKS.find((navlink) => key === navlink.key);
