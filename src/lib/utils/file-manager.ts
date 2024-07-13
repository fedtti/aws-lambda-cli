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
