const { composePlugins, withNx, withReact } = require('@nx/rspack');
const {
  ModuleFederationPlugin,
} = require('@module-federation/enhanced/rspack');
const mfConfig = require('./module-federation.config');
const path = require('path');

module.exports = composePlugins(withNx(), withReact(), (config, context) => {
  config.context = path.join(context.context.root, 'apps/mfe-monorepo');

  config.plugins.push(new ModuleFederationPlugin({ ...mfConfig }));
  config.output.publicPath = '/';

  config.module.parser = {
    'css/module': {
      namedExports: false,
    },
  };
  config.devServer = {
    ...config.devServer,
  };

  return config;
});
