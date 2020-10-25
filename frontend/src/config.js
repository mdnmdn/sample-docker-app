
//const defaultRootUri = process.env.REACT_APP_ROOT_URL || window.location.origin;
//const defaultApiUrl = process.env.REACT_APP_API_URL || defaultRootUri;

const baseConfig = window.feConfig || {};

const config = {
  //apiUrl: defaultApiUrl,
  //rootUri: defaultRootUri,
  environment: 'DEV',
  message: null,
  color: null,
  ...baseConfig,
};

if (config.environment !== 'production') {
  config.labelEnvironment = config.environment;
}

export default config;

export const {
  apiUrl,
  rootUri,
  environment,
  message,
  color,
  backgroundColor,
} = config;
