import fs from 'fs';

/**
 * Create a new empty folder of the given name, if available, or fallback to the default one.
 * @returns {string}
 */
export const CreateFolder: any = async (): Promise<string> => {
  if (process.argv.length >= 2) { // TODO: @fedtti - Exclude `--help`, `-h`, `help`, and other possible argument values.
    const folderName: string = process.argv[2];
    fs.mkdirSync(folderName);
    return folderName;
  } else {
    const defaultFolderName: string = 'my-lambda';
    fs.mkdirSync(defaultFolderName);
    return defaultFolderName;
  }
};

