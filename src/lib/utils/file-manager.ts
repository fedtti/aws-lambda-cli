import fs from 'fs';

/**
 * Create a new empty folder of the given name, if available, or fallback to a default one.
 * @returns {string}
 */
export const CreateFolder: any = async (): Promise<string> => {
  const folderName: string = (process.argv.length > 2) ? process.argv[2] : 'my-lambda';
  if (!fs.existsSync(`./${folderName}`)){
    fs.mkdirSync(folderName);
  }
  return folderName;
};

/**
 * Copy TypeScript configuration.
 */
export const TypeScriptInit: any = async (folder: string): Promise<any> => {
  try {
    const data = await fs.readFileSync('./src/lib/data/tsconfig.json');
    fs.writeFileSync(`./${folder}/tsconfig.json`, data);
  } catch (error) {
    // TODO: @fedtti - Throw new error.
    console.dir(error);
  }
};