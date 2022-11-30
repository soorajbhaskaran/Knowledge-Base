import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import queryString from "query-string";

import { SETTINGS_NAVLINKS } from "./constants";
import { getActiveNavLink } from "./utils";

const Settings = ({ history, location }) => {
  const { tab } = queryString.parse(location.search);
  const [loading, setLoading] = useState(true);
  const [activeNavlink, setActiveNavlink] = useState(
    () => getActiveNavLink(tab) || SETTINGS_NAVLINKS[0]
  );

  useEffect(() => {
    history.push(activeNavlink?.path);
    setLoading(false);
  }, [activeNavlink]);
  if (location.state?.resetTab) {
    location.state.resetTab = null;
    setActiveNavlink(() => getActiveNavLink(tab));
  }

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="relative z-0 flex items-start">
      <MenuBar showMenu>
        {SETTINGS_NAVLINKS.map((navlink) => (
          <div className="flex items-center" key={navlink.key}>
            <navlink.icon size={24} />
            <MenuBar.Item
              active={tab === navlink.key}
              description={navlink.description}
              key={navlink.key}
              label={navlink.label}
              onClick={() => setActiveNavlink(navlink)}
            />
          </div>
        ))}
      </MenuBar>
      <activeNavlink.component />
    </div>
  );
};

export default Settings;
