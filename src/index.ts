#!/usr/bin/env node

import { CreateFolder } from './lib/utils';

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

  // Initialize Git and npm.

};

run();
