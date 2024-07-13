import fs from 'fs';

/**
 * Create a new empty folder of the given name, if available, or fallback to a default one.
 * @returns {string}
 */
export const CreateFolder: any = (): string => {
  const folderName: string = (process.argv.length > 2) ? process.argv[2] : 'my-lambda';
  if (!fs.existsSync(`./${folderName}`)){
    fs.mkdirSync(folderName);
  }
  return folderName;
};

/**
 * Copy TypeScript configuration.
 */
export const TypeScriptConfig: any = (folder: string): any => {
  try {
    const data = fs.readFileSync('./dist/lib/data/tsconfig.json');
    fs.writeFileSync(`./${folder}/tsconfig.json`, data);
  } catch (error) {
    // TODO: @fedtti - Throw new error.
    console.dir(error);
  }
};

/**
 * Copy Serverless configuration.
 */
export const ServerlessConfig: any = (folder: string): any => {
  try {
    const data = fs.readFileSync('./dist/lib/data/serverless.yml');
    fs.writeFileSync(`./${folder}/serverless.yml`, data);
  } catch (error) {
    // TODO: @fedtti - Throw new error.
  }
};