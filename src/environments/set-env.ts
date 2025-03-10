const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // Load node modules
  const colors = require('colors');
  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env'
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
	ENVIRONMENT_NAME: '${process.env['ENVIRONMENT_NAME']}',
  FIREBASE_PROJECT_ID: '${process.env['FIREBASE_PROJECT_ID']}',
  FIREBASE_APP_ID: '${process.env['FIREBASE_APP_ID']}',
  FIREBASE_STORAGE_BUCKET: '${process.env['FIREBASE_STORAGE_BUCKET']}',
  FIREBASE_API_KEY: '${process.env['FIREBASE_API_KEY']}',
  FIREBASE_AUTH_DOMAIN: '${process.env['FIREBASE_AUTH_DOMAIN']}',
  FIREBASE_MESSAGING_SENDER_ID: '${process.env['FIREBASE_MESSAGING_SENDER_ID']}',
  FIREBASE_MEASUREMENT_ID: '${process.env['FIREBASE_MEASUREMENT_ID']}',
	appVersion: '${appVersion}',
	production: true,
  };
  `;
  console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
  writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
    }
  });
};

setEnv();
