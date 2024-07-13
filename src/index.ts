#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import {
  CreateFolder,
  GitInit,
  NpmInit,
  CopyConfigFiles
} from './lib/utils/index.js';

/**
 * Print the package description in the console.
 */
const init: any = (): any => {
  console.info(
    chalk.green(
      figlet.textSync('Create AWS Lambda', {
        font: 'Ghost'
      })
    )
  );
};

/**
 * 
 */
const run: any = async (): Promise<any> => {
  init();
  try {
    const folderName: string = await CreateFolder();
    await GitInit(folderName);
    const packageName: string = 'my-lambda';
    const packageOptions: PackageOptions = {
      
    };
    await NpmInit(folderName, packageName, packageOptions);
    // TODO @fedtti - Install package dependencies.
    await CopyConfigFiles(folderName);
    console.info('');
  } catch (error: any) {
    console.error(`${error.name}: ${error.message}.`);
    console.dir(error);
  }
};
run();
