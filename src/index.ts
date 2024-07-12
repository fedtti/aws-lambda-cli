#!/usr/bin/env node

import { CreateFolder, GitInit, NpmInit } from './lib/utils';

/**
 * 
 */
const init = async (): Promise<Choices> => {
  return {};
};

/**
 * 
 */
const run: any = async (): Promise<any> => {
  const choices: Choices = await init();
  try {
    const folderName: string = await CreateFolder();
    await GitInit(folderName);
    const packageName: string = choices.packageName || 'my-lambda';
    const packageOptions: any = {};
    await NpmInit(folderName, packageName, packageOptions);
    console.info();
  } catch (error) {
    console.error(error);
  }
};

run();
