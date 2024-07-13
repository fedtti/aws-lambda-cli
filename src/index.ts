#!/usr/bin/env node

import figlet from 'figlet';
import { CreateFolder, GitInit, NpmInit, TypeScriptInit } from './lib/utils';

/**
 * 
 */
const init = async (): Promise<UserChoices> => {
  figlet.text(
    'Create AWS Lambda',
    {},
    (error, data) => {
      if (!!error) {
        console.error('Something went wrong…');
        console.dir(error);
        return;
      }
      console.info(data);
    }
  );
  return {};
};

/**
 * 
 */
const run: any = async (): Promise<any> => {
  const choices: UserChoices = await init();
  try {
    const folderName: string = await CreateFolder();
    await GitInit(folderName);
    const packageName: string = choices.packageName || 'my-lambda';
    const packageOptions: NpmOptions = {
      
    };
    await NpmInit(folderName, packageName, packageOptions);
    await TypeScriptInit();
    console.info();
  } catch (error) {
    // TODO @fedtti - Throw new error.
    console.dir(error);
  }
};

run();
