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
  const choices: any = await init();
  try {
    const folder: string = await CreateFolder();
    await GitInit(folder);
    const name: string = '';
    const options: any = {};
    await NpmInit(name, folder, options);
  } catch (error) {
    console.error(error);
  }
};

run();
