const path = require("path");

module.exports = {
  resolve: {
    alias: {
      apis: "src/apis",
      utils: "src/utils",
      common: "src/common",
      hooks: "src/hooks",
      contexts: "src/contexts",
      reducers: "src/reducers",
      lib: "src/lib",
      components: "src/components",
      reactquery: "@tanstack/react-query",
      neetoui: "@bigbinary/neetoui",
      neetoicons: "@bigbinary/neeto-icons",
      images: path.resolve(__dirname, "../", "../", "app/assets/images"),
    },
  },
};
