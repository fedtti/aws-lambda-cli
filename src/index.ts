#!/usr/bin/env node

import { CreateFolder, GitInit } from './lib/utils';

/**
 * 
 */
const init = async () => {

};

/**
 * 
 */
const run: any = async () => {
  init();

  // Create a new folder.
  const folderName: string = await CreateFolder();

  // Initialize Git.
  const gitInit: any = await GitInit(folderName);
};

run();
