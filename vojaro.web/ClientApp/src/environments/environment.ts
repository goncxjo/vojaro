const appSettings = require('../../../appsettings.Development.json').Angular;
const version = require('package.json').version;

const name = appSettings.Environment;
const apiUrl = appSettings.ApiUrl;

export const environment = {
  production: false,
  apiUrl,
  name,
  version
};
