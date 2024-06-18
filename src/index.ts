#!/usr/bin/env node

import * as fs from 'fs';

/**
 * 
 */
const init = async () => {

};

/**
 * Create a new folder of the given name (if available) or fallback to the default name.
 * @returns {string}
 */
const createFolder: any = (): string => {
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

/**
 * 
 */
const run: any = async () => {
  init();
  // Create a new folder.
  const folderName: string = createFolder();

};

run();
