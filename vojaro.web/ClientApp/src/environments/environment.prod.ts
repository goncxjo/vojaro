const appSettings = require('../../../appsettings.json').Angular;
const version = require('package.json').version;

const name = appSettings.Environment;
const apiUrl = appSettings.ApiUrl;

export const environment = {
  production: true,
  apiUrl,
  name,
  version
};
