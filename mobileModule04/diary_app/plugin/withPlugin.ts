const { ConfigPlugin } = require("expo/config-plugins");
const androidPlugin = require("./androidPlugin");
const iosPlugin = require("./iosPlugin");

const withPlugin = (config: any) => {
  // Apply Android modifications first
  config = androidPlugin(config);
  // Then apply iOS modifications and return
  return iosPlugin(config);
};

module.exports = withPlugin;
