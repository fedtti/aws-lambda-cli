#!/usr/bin/env node

import { CreateFolder, GitInit, NpmInit } from './lib/utils';

/**
 * 
 */
const init = async () => {

};

/**
 * 
 */
const run: any = async (): Promise<any> => {
  await init();

  try {
    const folderName: string = await CreateFolder(); // Create a new folder.
    await GitInit(folderName); // Initialize a new Git repository.
    const options: any = {};
    await NpmInit(folderName, options); // Initialize a new npm package with the (optional) defined options.
  } catch (error) {

  }
};

run();
