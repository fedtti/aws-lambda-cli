import * as fs from 'fs';
import { spawn } from 'child_process';

/**
 * Create a new folder of the given name (if available) or fallback to the default name.
 * @returns {string}
 */
export const CreateFolder: any = (): string => {
  if (process.argv.length > 2) {
    const folderName: string = process.argv[2];
    fs.mkdirSync(folderName);
    return folderName;
  } else {
    const defaultFolderName: string = 'my-lambda';
    fs.mkdirSync(defaultFolderName);
    return defaultFolderName;
  }
};
