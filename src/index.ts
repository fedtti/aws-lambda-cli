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
    const folderName: string = await CreateFolder();
    await GitInit(folderName);
    const options: any = {};
    await NpmInit(folderName, options);
  } catch (error) {
    console.error(error);
  }
};

run();
