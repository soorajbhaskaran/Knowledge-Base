const path = require("path");

module.exports = {
  resolve: {
    alias: {
      apis: "src/apis",
      utils: "src/utils",
      common: "src/common",
      hooks: "src/hooks",
      stores: "src/stores",
      lib: "src/lib",
      components: "src/components",
      channels: "src/channels",
      reactquery: "@tanstack/react-query",
      neetoui: "@bigbinary/neetoui",
      neetoicons: "@bigbinary/neeto-icons",
      images: path.resolve(__dirname, "../", "../", "app/assets/images"),
    },
  },
};
